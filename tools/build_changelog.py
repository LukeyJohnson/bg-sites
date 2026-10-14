#!/usr/bin/env python3
"""
Build the changelog pages from changelog-src/entries/*.md.

    python3 tools/build_changelog.py            # writes docs/changelog/*.md
    python3 tools/build_changelog.py --register path/to/dir   # also writes MISSING-IMAGES.md + entries.json there

Each entry file is Markdown with a YAML-style front matter block:

    ---
    id: 46985                     # Sleekplan id, or any unique slug such as r-2026-03-01
    title: In-App Notifications Now in Deep Space
    date: 2025-07-23
    category: DS Platform         # see CATEGORIES below
    category_source: email-badge  # email-badge | inferred | manual
    sources: sleekplan-csv, sleekplan-email
    source_note: optional text shown as a tooltip
    ---
    Body in Markdown. Headings start at "##" inside the body (they are demoted one level on the page).
    Images: ![caption](img:screenshot.png) for a file in docs/assets/changelog/<id>/screenshot.png,
            ![caption](https://...) for an original remote URL — hosted if docs/assets/changelog/<id>/<basename> exists,
            otherwise a "Missing image" placeholder with a stable ID is rendered and registered.
"""
import argparse, html, json, os, re, sys
from collections import defaultdict
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENTRIES = os.path.join(ROOT, "changelog-src", "entries")
DOCS = os.path.join(ROOT, "docs")
ASSETS = os.path.join(DOCS, "assets", "changelog")
BRANCH_DATE = "2025-08-01"
LIVE_CHANGELOG = "https://feedback.deepspacesync.com/changelog/"
CATEGORIES = {"DS Platform": "platform", "DS Pro for Design": "design", "DS Pro for Construction": "construction",
              "DS Site": "site", "KAI": "kai", "DS Sync for Revit": "revit", "DS Sync for Navisworks": "navisworks"}

def parse_entry(path):
    s = open(path, encoding="utf-8").read()
    m = re.match(r"---\n(.*?)\n---\n?(.*)\Z", s, re.S)
    if not m: sys.exit(f"{path}: missing front matter")
    meta = {}
    for line in m.group(1).split("\n"):
        if ":" in line:
            k, v = line.split(":", 1); meta[k.strip()] = v.strip()
    for k in ("id", "title", "date", "category"):
        if not meta.get(k): sys.exit(f"{path}: front matter needs '{k}'")
    if meta["category"] not in CATEGORIES: sys.exit(f"{path}: unknown category '{meta['category']}' (use one of {list(CATEGORIES)})")
    datetime.strptime(meta["date"], "%Y-%m-%d")
    meta["sources"] = [x.strip() for x in meta.get("sources", "manual").split(",") if x.strip()]
    meta.setdefault("category_source", "manual")
    meta["body"] = m.group(2).strip(); meta["file"] = os.path.relpath(path, ROOT)
    return meta

def fmt_date(s): return datetime.strptime(s, "%Y-%m-%d").strftime("%d %b %Y").lstrip("0")

def load_register(path):
    keep = {}
    if path and os.path.isfile(path):
        for line in open(path, encoding="utf-8"):
            if line.startswith("| MISSING-IMG-"):
                c = [x.strip() for x in line.strip().strip("|").split("|")]
                if len(c) >= 8: keep[c[0]] = {"tried": c[6], "status": c[7]}
    return keep

class Images:
    def __init__(self, keep): self.keep, self.register, self.counter, self.hosted = keep, [], defaultdict(int), 0
    def render(self, eid, url, alt, entry, indent):
        if url.startswith("img:"):
            fname, url_disp, caption = url[4:], "", alt or url[4:]
        else:
            self.counter[eid] += 1
            fname, url_disp = url.rsplit("/", 1)[-1], url
            caption = re.sub(r"-\d+$", "", alt or "").strip() or fname
        local = os.path.join(ASSETS, eid, fname)
        if not os.path.isfile(local) and not url.startswith("img:"):   # recovered originals keep their own name
            alt_file = os.path.join(ASSETS, eid, caption)
            if os.path.isfile(alt_file): local, fname = alt_file, caption
        if os.path.isfile(local) and os.path.getsize(local) > 0:
            self.hosted += 1
            lines = ['<figure markdown="span">', f'  ![{caption}](../assets/changelog/{eid}/{fname}){{ loading=lazy }}',
                     f'  <figcaption>{caption}</figcaption>', '</figure>']
        else:
            pid = f"MISSING-IMG-{eid}-{self.counter[eid]}"; prev = self.keep.get(pid, {})
            self.register.append({"id": pid, "changelog_id": eid, "entry": entry["title"], "date": entry["date"], "url": url_disp, "alt": caption,
                                  "tried": prev.get("tried", "direct (403 AccessDenied); Wayback (no capture)"), "status": prev.get("status", "missing")})
            lines = [f'!!! warning "Missing image · {pid}"', f'    `{caption}` has not been recovered yet. Original location: `{url_disp}`']
        return "\n" + "\n".join(indent + l for l in lines) + "\n"

def convert_body(body, eid, entry, images):
    s = re.sub(r"(?m)^([ \t]*)(#{1,5})\s+", lambda m: m.group(1) + "#" * min(len(m.group(2)) + 1, 4) + " ", body)
    out = []
    for line in s.split("\n"):
        m = re.match(r"^([ \t]*)(.*?)!\[([^\]]*)\]\(([^)\s]+)\)(.*)$", line)
        if m and m.group(4).startswith(("img:", "http")):
            indent, before, alt, url, after = m.groups()
            if before.strip(): out.append(indent + before.rstrip())
            out.append(images.render(eid, url, alt, entry, indent))
            if after.strip(): out.append(indent + after.strip())
        else:
            out.append(line)
    s = "\n".join(out)
    # a list/quote that directly follows a paragraph line needs a blank line before it (not between list items)
    s = re.sub(r"(?m)^(?![ \t]*(?:[*\-] |\d+\. |> |#|!!!|\?\?\?))(\S[^\n]*)\n([ \t]*(?:[*\-] |\d+\. |> ))", r"\1\n\n\2", s)
    return re.sub(r"\n{3,}", "\n\n", s).strip()

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--register", help="dir to write MISSING-IMAGES.md and entries.json"); a = ap.parse_args()
    entries = [parse_entry(os.path.join(ENTRIES, f)) for f in sorted(os.listdir(ENTRIES)) if f.endswith(".md") and not f.startswith("_")]
    ids = [e["id"] for e in entries]
    dup = {i for i in ids if ids.count(i) > 1}
    if dup: sys.exit(f"duplicate entry ids: {dup}")
    def key(e): return (e["date"], int(e["id"]) if e["id"].isdigit() else 0)
    pre = sorted([e for e in entries if e["date"] < BRANCH_DATE], key=key, reverse=True)
    post = sorted([e for e in entries if e["date"] >= BRANCH_DATE and e["id"].isdigit() and "sleekplan-csv" in e["sources"]], key=key, reverse=True)
    # new releases added after the branch by hand (non-Sleekplan) are hosted here too
    pre += sorted([e for e in entries if e["date"] >= BRANCH_DATE and e not in post], key=key, reverse=True)
    pre.sort(key=key, reverse=True)

    reg_path = os.path.join(a.register, "MISSING-IMAGES.md") if a.register else None
    images = Images(load_register(reg_path))
    years = defaultdict(list)
    for e in pre: years[e["date"][:4]].append(e)
    os.makedirs(os.path.join(DOCS, "changelog"), exist_ok=True)
    for y, es in years.items():
        parts = [f"---\ntitle: {y}\n---\n\n# Changelog {y}\n",
                 f"{len(es)} update{'s' if len(es) != 1 else ''} released in {y}, newest first. See the [changelog overview](index.md) for all years and the category legend.\n"]
        for e in es:
            eid = e["id"]; slug = CATEGORIES[e["category"]]
            meta = [f'<span class="cl-badge cl-badge-{slug}">{e["category"]}</span>']
            if e["category_source"] == "inferred":
                meta.append('<span class="cl-inferred" title="Category inferred during reconstruction; no Sleekplan email badge exists for this entry">inferred</span>')
            meta.append(f'<span class="cl-date">{fmt_date(e["date"])}</span>')
            if eid.isdigit(): meta.append(f'<span class="cl-id">#{eid}</span>')
            if e.get("source_note"): meta.append(f'<span class="cl-src" title="{html.escape(e["source_note"], quote=True)}">announcement email</span>')
            parts += [f'## {e["title"]} {{ #cl-{eid} }}\n', '<p class="cl-meta">' + " ".join(meta) + "</p>\n", convert_body(e["body"], eid, e, images) + "\n", "\n---\n"]
        open(os.path.join(DOCS, "changelog", f"{y}.md"), "w", encoding="utf-8").write("\n".join(parts))

    cats = sorted({e["category"] for e in pre})
    first, last = min(e["date"] for e in pre), max(e["date"] for e in pre)
    idx = ["---\ntitle: Changelog\n---\n\n# Deep Space Changelog\n",
           "The release history of the Deep Space platform — DS Pro, DS Sync, DS Site, KAI and the platform itself — "
           f"from the first DS Sync for Revit release in {datetime.strptime(first, '%Y-%m-%d').strftime('%B %Y')} through to {datetime.strptime(last, '%Y-%m-%d').strftime('%B %Y')}. "
           f"{len(pre)} updates, hosted here permanently with their original text and the images that could be recovered.\n",
           '!!! info "Where the changelog continues"\n    From August 2025 the product changelog is published on Deep Space Horizon at '
           "[feedback.deepspacesync.com/changelog](https://feedback.deepspacesync.com/changelog). This site is the permanent home of everything before that point, and of DS Pro releases published here since.\n",
           '!!! tip "Tip: filter by product"\n    Use the **Search** bar (or ++ctrl+k++) and type a category such as **DS Platform**, **DS Pro for Construction** or **KAI**.\n',
           "## Categories\n", "<p>" + " ".join(f'<span class="cl-badge cl-badge-{CATEGORIES[c]}">{c}</span>' for c in cats) + "</p>\n",
           '<p class="cl-note">Entries marked <span class="cl-inferred">inferred</span> have a category assigned during reconstruction because the original Sleekplan badge was not available. '
           'Entries marked <span class="cl-src">announcement email</span> were reconstructed from product announcement emails rather than Sleekplan.</p>\n']
    for y in sorted(years, reverse=True):
        idx += [f"## {y}\n", "| Date | Category | Update |\n|---|---|---|"]
        idx += [f'| {fmt_date(e["date"])} | <span class="cl-badge cl-badge-{CATEGORIES[e["category"]]}">{e["category"]}</span> | [{e["title"]}]({y}.md#cl-{e["id"]}) |' for e in years[y]]
        idx.append("")
    if post:
        idx += ["## After the branch (Horizon era)\n", "Published on Deep Space Horizon; listed here for completeness and linked to the live entry.\n", "| Date | Update |\n|---|---|"]
        idx += [f'| {fmt_date(e["date"])} | [{e["title"]}]({LIVE_CHANGELOG}{e["id"]}) |' for e in post]; idx.append("")
    open(os.path.join(DOCS, "changelog", "index.md"), "w", encoding="utf-8").write("\n".join(idx))

    if a.register:
        os.makedirs(a.register, exist_ok=True)
        with open(reg_path, "w", encoding="utf-8") as f:
            f.write("# Missing image register — Job 01\n\nGenerated by bg-sites `tools/build_changelog.py --register`. One row per image that could not be recovered. "
                    "The ID is the placeholder shown in the published page. Edit `Tried`/`Status` here; the build preserves them by ID on re-run.\n\n"
                    f"Status values: `missing`, `found-unverified`, `hosted`.\n\n**{len(images.register)} missing · {images.hosted} hosted**\n\n"
                    "| ID | Changelog ID | Entry | Date | Original URL | Alt text | Tried | Status |\n|---|---|---|---|---|---|---|---|\n")
            for r in images.register:
                f.write(f'| {r["id"]} | {r["changelog_id"]} | {r["entry"]} | {r["date"]} | {r["url"]} | {r["alt"]} | {r["tried"]} | {r["status"]} |\n')
        json.dump([{k: v for k, v in e.items() if k != "body"} for e in entries], open(os.path.join(a.register, "entries.json"), "w"), indent=1, ensure_ascii=False)
    print(f"entries: {len(entries)}  hosted here: {len(pre)}  horizon-era (linked): {len(post)}  years: {sorted(years)}")
    print(f"images hosted: {images.hosted}  missing: {len(images.register)}")

if __name__ == "__main__":
    main()
