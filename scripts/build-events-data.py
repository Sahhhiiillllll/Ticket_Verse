#!/usr/bin/env python3
"""Regenerate ../events-data.js from ../tickets.tsv (tab-separated, 12 columns per line)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TSV = ROOT / "tickets.tsv"
OUT = ROOT / "events-data.js"


def js_escape(s: str) -> str:
    return json.dumps(str(s), ensure_ascii=False)


def main() -> None:
    rows = []
    for line in TSV.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        parts = line.split("\t")
        if len(parts) != 12:
            raise SystemExit(f"Expected 12 tab columns, got {len(parts)}: {line[:120]!r}")
        rows.append(parts)
    lines = ["/** Auto-generated from tickets.tsv — run scripts/build-events-data.py */", "window.TICKET_ROWS = ["]
    for i, p in enumerate(rows):
        lines.append("  [" + ",".join(js_escape(x) for x in p) + "]" + ("," if i < len(rows) - 1 else ""))
    lines.append("];")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {len(rows)} rows to {OUT}")


if __name__ == "__main__":
    main()
