# Changelog source

`entries/` is the source of truth for the public changelog at `/changelog/`.
One Markdown file per release. `docs/changelog/*.md` are **generated** — never
edit them by hand; run the build instead.

## Add a new DS Pro release

1. Copy `entries/_TEMPLATE.md` to `entries/YYYY-MM-DD-short-slug.md` and fill in
   the front matter and body.
2. Put screenshots in `docs/assets/changelog/<id>/` (the `id` from the front
   matter) and reference them as `![caption](img:filename.png)`. Keep images
   under ~1400 px wide.
3. Build and check:

   ```bash
   pip install mkdocs-material        # once
   python3 tools/build_changelog.py   # regenerates docs/changelog/
   mkdocs build --strict              # must pass with no warnings
   mkdocs serve                       # preview at http://127.0.0.1:8000/changelog/
   ```

4. Commit the entry file, the images and the regenerated `docs/changelog/`
   pages together. Pushing to `main` deploys automatically.

## Front matter

| Key | Required | Notes |
|---|---|---|
| `id` | yes | Unique. Sleekplan numeric id for imported entries; for new releases use `r-YYYY-MM-DD` or `r-YYYY-MM-DD-b` if two land on one day. Also the folder name under `docs/assets/changelog/`. |
| `title` | yes | Shown as the entry heading and in the overview table. |
| `date` | yes | `YYYY-MM-DD`. Entries are grouped by year and sorted newest first. |
| `category` | yes | One of `DS Platform`, `DS Pro for Design`, `DS Pro for Construction`, `DS Site`, `KAI`, `DS Sync for Revit`, `DS Sync for Navisworks`. |
| `category_source` | no | `manual` (default), `email-badge`, or `inferred` (shows an "inferred" marker). |
| `sources` | no | Comma list, e.g. `release-notes`. Imported entries use `sleekplan-csv`, `sleekplan-email`, `announcement-email`. |
| `source_note` | no | Tooltip text; shows an "announcement email" marker. |

## Body conventions

- Start body headings at `##`; the build demotes them one level under the entry's own heading.
- Bullet lists, bold, links, blockquotes and `??? note "..."` collapsible blocks all work (MkDocs Material).
- `![caption](img:file.png)` → hosted image from `docs/assets/changelog/<id>/file.png`.
- Links to `https://feedback.deepspacesync.com/changelog/<id>` are rewritten to the in-site anchor when that entry is hosted here; links to hosts listed in `DEAD_HOSTS` in the build script render as plain text.
- Every entry has a stable anchor `#cl-<id>` (shown as the ¶ permalink and the "Copy link" button).
- `![caption](https://original/url.jpg)` → hosted if `docs/assets/changelog/<id>/url.jpg` exists, otherwise rendered as a
  "Missing image · MISSING-IMG-<id>-<n>" placeholder so it can be recovered later.

## Where the history came from

Entries named `sleekplan-*.md` were imported once from the Sleekplan CSV export and the
Sleekplan notification emails (category badges), plus a few HubSpot announcement emails.
The importer and the gap registers live in the private bg-ops repo
(`solutions/bg-sites-cicd-tasks/jobs/01-changelog-reconstruction/`). Re-running the importer
rewrites `sleekplan-*.md` files only; hand-written entries are never touched.
