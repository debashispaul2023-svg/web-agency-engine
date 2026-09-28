#!/usr/bin/env python3
"""Compile Jinja templates + data.json into dist/."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
TEMPLATES = ROOT / "templates"
DATA = ROOT / "data.json"
PAGES = ("index.html", "services.html", "contact.html")


def load_context() -> dict:
    raw = json.loads(DATA.read_text(encoding="utf-8"))
    business = raw.get("business") or raw
    business.setdefault("name", "")
    business.setdefault("phone", "")
    business.setdefault("email", "")
    business.setdefault("address", "")
    business.setdefault("website", "")
    business.setdefault("services", [])
    return {"business": business, "source": raw.get("source", {})}


def copy_assets() -> None:
    js = ROOT / "main.js"
    if js.exists():
        shutil.copy2(js, DIST / "main.js")
    static_src = ROOT / "static"
    if static_src.is_dir():
        dest = DIST / "static"
        if dest.exists():
            shutil.rmtree(dest)
        shutil.copytree(static_src, dest)


def build() -> None:
    if not DATA.exists():
        raise SystemExit("data.json is missing — run scraper.py first")
    DIST.mkdir(parents=True, exist_ok=True)
    env = Environment(
        loader=FileSystemLoader(str(TEMPLATES)),
        autoescape=select_autoescape(["html", "xml"]),
    )
    ctx = load_context()
    for page in PAGES:
        html = env.get_template(page).render(**ctx)
        (DIST / page).write_text(html, encoding="utf-8")
        print(f"wrote dist/{page}")
    copy_assets()
    print(f"build complete → {DIST}")


if __name__ == "__main__":
    build()
