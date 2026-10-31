#!/usr/bin/env python3
"""Build a playable zip: HTML at archive root, under 50 MB, no remote fonts."""

from __future__ import annotations

import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAGE = Path("/tmp/pets-release")
ZIP_PATH = Path("/Users/sheep/Public/games/山谷动物家园.zip")
LOCAL_ZIP = ROOT / "valley-animal-sanctuary-upload.zip"
DIST = ROOT / "dist"

KEEP_FILES = (
    "index.html",
    "game.js",
    "styles.css",
)
KEEP_DIRS = (
    "assets",
    "vendor",
)
SKIP_DIR_NAMES = {
    "node_modules",
    "tests",
    "scripts",
    "tmp",
    "dist",
    ".git",
}
SKIP_SUFFIXES = {".md", ".zip", ".py", ".pyc"}
REMOTE_RE = re.compile(r"fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net|unpkg\.com")


def should_copy(path: Path) -> bool:
    if any(part in SKIP_DIR_NAMES or part.startswith(".") for part in path.parts):
        return False
    if path.suffix.lower() in SKIP_SUFFIXES:
        return False
    return True


def copy_tree(src: Path, dest: Path) -> None:
    for item in src.rglob("*"):
        if not item.is_file() or not should_copy(item.relative_to(src)):
            continue
        target = dest / item.relative_to(src)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(item, target)


def scan_remote(stage: Path) -> list[str]:
    hits: list[str] = []
    for path in stage.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in {".html", ".js", ".css"}:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        if REMOTE_RE.search(text):
            hits.append(path.relative_to(stage).as_posix())
    return hits


def write_zip(dest: Path) -> None:
    if dest.exists():
        dest.unlink()
    dest.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in sorted(STAGE.rglob("*")):
            if path.is_file():
                archive.write(path, path.relative_to(STAGE).as_posix())


def main() -> None:
    if STAGE.exists():
        shutil.rmtree(STAGE)
    STAGE.mkdir(parents=True)

    for name in KEEP_FILES:
        shutil.copy2(ROOT / name, STAGE / name)
    for name in KEEP_DIRS:
        copy_tree(ROOT / name, STAGE / name)

    remote = scan_remote(STAGE)
    if remote:
        raise SystemExit(f"remote font/cdn references remain: {', '.join(remote)}")
    if not (STAGE / "index.html").exists():
        raise SystemExit("index.html missing from stage root")

    write_zip(ZIP_PATH)
    shutil.copy2(ZIP_PATH, LOCAL_ZIP)

    if DIST.exists():
        shutil.rmtree(DIST)
    shutil.copytree(STAGE, DIST)

    size = ZIP_PATH.stat().st_size
    print(f"stage {sum(p.stat().st_size for p in STAGE.rglob('*') if p.is_file()) / 1024 / 1024:.2f} MB")
    print(f"zip {ZIP_PATH} {size / 1024 / 1024:.2f} MB")
    if size > 50 * 1024 * 1024:
        raise SystemExit("zip exceeds 50 MB")


if __name__ == "__main__":
    main()
