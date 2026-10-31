#!/usr/bin/env python3
"""Extract nine pet poses from a 3x3 chroma-key action sheet."""

from __future__ import annotations

import argparse
import subprocess
from collections import deque
from pathlib import Path

from PIL import Image


FRAME_NAMES = (
    "idle-0",
    "idle-1",
    "eat-0",
    "eat-1",
    "affection-0",
    "affection-1",
    "play-0",
    "play-1",
    "sleep",
)
CANVAS_SIZE = 512


def connected_components(alpha: Image.Image) -> list[dict[str, object]]:
    width, height = alpha.size
    pixels = alpha.tobytes()
    visited = bytearray(width * height)
    components: list[dict[str, object]] = []

    for start, value in enumerate(pixels):
        if value <= 16 or visited[start]:
            continue
        queue = deque([start])
        visited[start] = 1
        members: list[int] = []
        min_x = width
        min_y = height
        max_x = max_y = 0

        while queue:
            current = queue.popleft()
            members.append(current)
            x, y = current % width, current // width
            min_x, min_y = min(min_x, x), min(min_y, y)
            max_x, max_y = max(max_x, x), max(max_y, y)
            for neighbor in (current - 1, current + 1, current - width, current + width):
                if neighbor < 0 or neighbor >= width * height or visited[neighbor]:
                    continue
                nx, ny = neighbor % width, neighbor // width
                if abs(nx - x) + abs(ny - y) != 1 or pixels[neighbor] <= 16:
                    continue
                visited[neighbor] = 1
                queue.append(neighbor)

        components.append(
            {
                "members": members,
                "area": len(members),
                "bbox": (min_x, min_y, max_x + 1, max_y + 1),
                "center": ((min_x + max_x + 1) / 2, (min_y + max_y + 1) / 2),
            }
        )
    return components


def group_components(image: Image.Image) -> list[list[dict[str, object]]]:
    components = connected_components(image.getchannel("A"))
    frame_count = len(FRAME_NAMES)
    seeds = sorted(components, key=lambda item: item["area"], reverse=True)[:frame_count]
    if len(seeds) != frame_count:
        raise SystemExit(f"expected {frame_count} pose components, found {len(seeds)}")

    groups = [[seed] for seed in seeds]
    seed_ids = {id(seed) for seed in seeds}
    largest_area = seeds[0]["area"]
    for component in components:
        if id(component) in seed_ids or component["area"] < largest_area * 0.0005:
            continue
        cx, cy = component["center"]
        nearest = min(
            range(frame_count),
            key=lambda index: (seeds[index]["center"][0] - cx) ** 2
            + (seeds[index]["center"][1] - cy) ** 2,
        )
        groups[nearest].append(component)

    groups.sort(key=lambda group: group[0]["center"][1])
    ordered: list[list[dict[str, object]]] = []
    for row_start in range(0, frame_count, 3):
        ordered.extend(sorted(groups[row_start : row_start + 3], key=lambda group: group[0]["center"][0]))
    return ordered


def render_group(
    source: Image.Image,
    group: list[dict[str, object]],
    scale: float,
) -> Image.Image:
    width, height = source.size
    min_x = min(item["bbox"][0] for item in group)
    min_y = min(item["bbox"][1] for item in group)
    max_x = max(item["bbox"][2] for item in group)
    max_y = max(item["bbox"][3] for item in group)
    sprite = Image.new("RGBA", (max_x - min_x, max_y - min_y), (0, 0, 0, 0))
    source_pixels = source.load()
    sprite_pixels = sprite.load()

    for component in group:
        for index in component["members"]:
            x, y = index % width, index // width
            sprite_pixels[x - min_x, y - min_y] = source_pixels[x, y]

    target_width = max(1, round(sprite.width * scale))
    target_height = max(1, round(sprite.height * scale))
    if target_width > CANVAS_SIZE - 8 or target_height > CANVAS_SIZE - 8:
        fit = min((CANVAS_SIZE - 8) / target_width, (CANVAS_SIZE - 8) / target_height)
        target_width = max(1, round(target_width * fit))
        target_height = max(1, round(target_height * fit))
    sprite = sprite.resize((target_width, target_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    left = (CANVAS_SIZE - sprite.width) // 2
    top = CANVAS_SIZE - sprite.height - 4
    canvas.alpha_composite(sprite, (left, top))
    pixels = bytearray(canvas.tobytes())
    for offset in range(0, len(pixels), 4):
        if pixels[offset + 3] == 0:
            pixels[offset : offset + 3] = b"\x00\x00\x00"
    return Image.frombytes("RGBA", canvas.size, bytes(pixels))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output-dir", required=True, type=Path)
    args = parser.parse_args()

    source = Image.open(args.input).convert("RGBA")
    groups = group_components(source)
    cell_pitch = max(source.width / 3, source.height / 3)
    scale = (CANVAS_SIZE * 0.92) / cell_pitch
    args.output_dir.mkdir(parents=True, exist_ok=True)

    for name, group in zip(FRAME_NAMES, groups, strict=True):
        visible_group = [group[0]] if name == "play-0" else group
        frame = render_group(source, visible_group, scale)
        temporary_png = args.output_dir / f".{name}.png"
        output_webp = args.output_dir / f"{name}.webp"
        frame.save(temporary_png, "PNG", optimize=True)
        subprocess.run(["cwebp", "-quiet", "-lossless", "-exact", str(temporary_png), "-o", str(output_webp)], check=True)
        temporary_png.unlink()

    print(f"Wrote {len(FRAME_NAMES)} frames to {args.output_dir}")


if __name__ == "__main__":
    main()
