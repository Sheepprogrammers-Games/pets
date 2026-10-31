#!/usr/bin/env python3
"""Re-frame pet and prop art onto the canvases the renderer assumes.

Two conventions are enforced here, both of which the CSS relies on:

* Pet action frames live on a 512x512 canvas with the body centred
  horizontally and its bottom edge four pixels above the canvas floor.
  ``extract_action_frames.py`` already produces that layout for the eight
  active poses; the sleep pose was exported separately and drifted, which is
  why ``styles.css`` used to carry per-pet nudges.
* Item art lives on a square canvas so that any ``object-fit: contain`` box
  renders every item at the same apparent size. Scene furniture is skipped: it
  is placed with a per-item footprint and scale, so its canvas is load-bearing.

Sleep poses have no reliable scale baked into the source art: some were
stretched to the full canvas width, others were left small and centred. The body
is therefore re-scaled against the same pet's ``idle-0`` frame. Standing height
is the steadiest proxy for how large an animal is, and a curled or stretched-out
sleeping body reads as roughly that long.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path

from PIL import Image

PET_CANVAS = 512
PET_FLOOR_MARGIN = 4

PROP_CANVAS = 1024
PROP_FILL = 0.94

FURNITURE_IDS = frozenset({"starter-bed", "woven-rug", "cat-post", "rabbit-tunnel", "toy-basket"})

# A sleeping body is about as long as the animal is tall, and never as tall as one standing up.
SLEEP_LENGTH_OF_IDLE_HEIGHT = 1.15
SLEEP_HEIGHT_OF_IDLE_HEIGHT = 0.72


def content_box(image: Image.Image) -> tuple[int, int, int, int]:
    box = image.getchannel("A").getbbox()
    if box is None:
        raise ValueError("image is fully transparent")
    return box


def trimmed(image: Image.Image) -> Image.Image:
    return image.crop(content_box(image))


def clear_transparent_rgb(image: Image.Image) -> Image.Image:
    """Zero the colour channels of fully transparent pixels so WebP stays small."""
    pixels = bytearray(image.tobytes())
    for offset in range(0, len(pixels), 4):
        if pixels[offset + 3] == 0:
            pixels[offset : offset + 3] = b"\x00\x00\x00"
    return Image.frombytes("RGBA", image.size, bytes(pixels))


def place(body: Image.Image, canvas: tuple[int, int], bottom_margin: int) -> Image.Image:
    sheet = Image.new("RGBA", canvas, (0, 0, 0, 0))
    left = (canvas[0] - body.width) // 2
    top = canvas[1] - body.height - bottom_margin
    sheet.alpha_composite(body, (left, top))
    return clear_transparent_rgb(sheet)


def fit(body: Image.Image, max_width: float, max_height: float) -> Image.Image:
    scale = min(max_width / body.width, max_height / body.height)
    size = (max(1, round(body.width * scale)), max(1, round(body.height * scale)))
    return body.resize(size, Image.Resampling.LANCZOS)


def encode(image: Image.Image, destination: Path, lossless: bool) -> None:
    staging = destination.with_suffix(".staging.png")
    image.save(staging, "PNG", optimize=True)
    command = ["cwebp", "-quiet", "-exact", str(staging), "-o", str(destination)]
    command[1:1] = ["-lossless"] if lossless else ["-q", "92", "-alpha_q", "100"]
    try:
        subprocess.run(command, check=True)
    finally:
        staging.unlink(missing_ok=True)


def backup(path: Path, root: Path, vault: Path) -> None:
    target = vault / path.relative_to(root)
    if target.exists():
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, target)


def normalize_sleep_frame(pet_dir: Path, source: Path | None = None) -> tuple[int, int]:
    """Re-frame one pet's sleep pose against its own standing pose."""
    sleeping = Image.open(source or pet_dir / "sleep.webp").convert("RGBA")
    idle_box = content_box(Image.open(pet_dir / "idle-0.webp").convert("RGBA"))

    standing_height = idle_box[3] - idle_box[1]
    max_width = min(standing_height * SLEEP_LENGTH_OF_IDLE_HEIGHT, PET_CANVAS - 2 * PET_FLOOR_MARGIN)
    max_height = standing_height * SLEEP_HEIGHT_OF_IDLE_HEIGHT

    body = fit(trimmed(sleeping), max_width, max_height)
    frame = place(body, (PET_CANVAS, PET_CANVAS), PET_FLOOR_MARGIN)
    encode(frame, pet_dir / "sleep.webp", lossless=True)
    return body.size


def normalize_prop(path: Path, source: Path | None = None) -> tuple[int, int]:
    art = Image.open(source or path).convert("RGBA")
    canvas = (PROP_CANVAS, PROP_CANVAS)
    body = fit(trimmed(art), PROP_CANVAS * PROP_FILL, PROP_CANVAS * PROP_FILL)
    margin = round(PROP_CANVAS * (1 - PROP_FILL) / 2)
    encode(place(body, canvas, margin), path, lossless=False)
    return canvas


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--skip-pets", action="store_true")
    parser.add_argument("--skip-props", action="store_true")
    args = parser.parse_args()

    assets = args.root / "assets"
    vault = assets / ".original"

    if not args.skip_pets:
        for pet_dir in sorted((assets / "pets" / "actions").iterdir()):
            if not pet_dir.is_dir():
                continue
            frame = pet_dir / "sleep.webp"
            backup(frame, assets, vault)
            # Always re-frame from the vaulted original so repeat runs do not compound resampling.
            size = normalize_sleep_frame(pet_dir, vault / frame.relative_to(assets))
            print(f"sleep {pet_dir.name}: body {size[0]}x{size[1]} on {PET_CANVAS}x{PET_CANVAS}")

    if not args.skip_props:
        for prop in sorted((assets / "props").glob("*.webp")):
            if prop.stem in FURNITURE_IDS:
                continue
            backup(prop, assets, vault)
            canvas = normalize_prop(prop, vault / prop.relative_to(assets))
            print(f"prop {prop.stem}: {canvas[0]}x{canvas[1]}")


if __name__ == "__main__":
    main()
