# Plan: Split + bundle the MMPro skills file into a self-contained distributable package

## Context

This plan combines two related pieces of work that emerged from the same conversation:

1. **Token-size problem:** `mega-menu-pro-skills.md` has grown to ~1617 lines / ~40K tokens (4x its
   original ~9K-token baseline). Its own header already declares "Sections 4–7 are lookup-only," but
   the mandatory Step 0 ("read this entire skill file") forces a full read of that lookup-only content
   every session regardless. Splitting the genuinely lookup-only sections into a second file — consulted
   via Grep on demand, not read in full at session start — fixes this with zero information loss.

2. **Distribution problem:** while scoping that split, the natural fix for Section 4's duplication with
   the `components/` folder (point Section 4 at it via relative path) doesn't actually work for a
   *distributed* copy of the skills file — `../components/` only resolves inside this workspace. The
   real download mechanism (a GitHub link in `ai-connector/README.md`) currently points at the single
   `mega-menu-pro-skills.md` file, not a folder, so `components/` was never actually part of what a user
   downloads. The fix: bundle the skills file, its new reference-file companion, and a copy of
   `components/` into one self-contained folder, and point the download link at that folder.

Two pre-existing path bugs were found during research, in files this work touches anyway, and are fixed
as part of this same pass (see "Incidental fixes" below).

## Final structure

```
MMPro Etch Docs/
├─ ai-connector/
│  ├─ README.md                          (download link updated)
│  ├─ .gitbook.yaml, SUMMARY.md           (unchanged — don't reference the skills file directly)
│  └─ mmpro-skills/                       (NEW — the self-contained bundle)
│     ├─ mega-menu-pro-skills.md          (moved + edited: split content removed, paths fixed)
│     ├─ mega-menu-pro-skills-reference.md (NEW — lookup-only companion)
│     └─ components/                      (NEW — copy of the 5 files below)
│        ├─ dwc-header.md
│        ├─ dwc-nav.md
│        ├─ dwc-dropdown.md
│        ├─ dwc-menu-item.md
│        └─ dwc-mobile-toggle.md
└─ components/                            (unchanged, stays in place — original/source of truth)
```

`components/` is **copied**, not moved (per your instruction) — the original at `MMPro Etch Docs/components/`
stays as-is and remains what `mmpro-dev-context.md` points developer sessions at. The bundled copy inside
`mmpro-skills/` exists only so the distributable package is self-contained. **Known tradeoff:** two copies
can drift out of sync if component docs are updated later without remembering to update both — flagged
explicitly in the file itself (see dev-context update below) so a future session catches it.

## What moves into `mega-menu-pro-skills-reference.md` (verbatim, no rewriting)

| Content | Current lines (pre-move) |
|---|---|
| Section 4 — Prop reference (+ one new pointer line to the bundled `components/` folder) | 971–1174 |
| Section 5 — Special sticky/overlay styles | 1176–1299 |
| Section 6, latter part — "Adding a new prop," "Style entry IDs are site-specific," "`etch.styles` API shape" | 1397–1430 |
| Section 7 — JavaScript config | 1434–1454 |
| Section 8 — Templates (currently just a placeholder) | 1456–1491 |

## What stays in `mega-menu-pro-skills.md` (unchanged content)

Top matter, full START HERE workflow, Before you start, Connector quick-start, Agent Skills Update,
Sections 1–3, Section 6's first part (Editing workflow, Execution discipline, Never-default rule,
Global-vs-local, persistence table, full DO NOT list — lines 1301–1395), and Appendix A in full.
Section numbers (1–8) are preserved as-is across both files — not renumbered — to avoid touching the
12 existing internal cross-references; a one-line bridging note is added where Sections 4–5 used to sit,
pointing to the reference file. One small deletion: the ~6-line "Customization hierarchy" duplicate
inside Section 6 (it repeats Section 2's TIER 1–4 list verbatim).

## Path reference fixes (required because the file moves one folder deeper)

In `mega-menu-pro-skills.md`, now living in `ai-connector/mmpro-skills/` instead of `ai-connector/`:
- Dev context path: `../MMPro Etch/mmpro-dev-context.md` → `../../MMPRO ETCH/mmpro-dev-context.md`
  (adds the extra `../` for the new depth, **and fixes the casing bug** — the real folder is `MMPRO ETCH`,
  all caps; the old reference only worked by accident on Windows' case-insensitive filesystem).
- Cheatsheet path: `../ETCH-DEV-API/etch-connector-cheatsheet.md` → `../../ETCH-DEV-API/etch-connector-cheatsheet.md`.
- "This skills file lives in a folder called `MMPro Etch Docs`" → updated to the accurate nested path.
- New: a `./components/` pointer added in the reference file's Section 4 (sibling folder within the bundle).

## Incidental fixes (found during research, in files this work already touches)

- `MMPRO ETCH/mmpro-dev-context.md`: its own self-reference ("All paths are relative to this file
  (`MMPro Etch/mmpro-dev-context.md`)") has the same casing bug — corrected.
- Same file's documented skills-file path (`../MMPro Etch Docs/mega-menu-pro-skills.md`) is missing the
  `ai-connector/` segment entirely (pre-existing inaccuracy, unrelated to this move) — corrected to the
  new full path, plus a new line added for the reference file's path and the bundled-components-copy
  drift-risk note described above.

## Download link update

`MMPro Etch Docs/ai-connector/README.md` line 50, currently:
`[Download the MMPro Skills File](https://github.com/udoro/MMPro-Etch-Docs/blob/main/ai-connector/mega-menu-pro-skills.md)`

→ changes to a folder (tree) view of the new bundle, with updated link text reflecting it's a package:
`[Download the MMPro Skills Package](https://github.com/udoro/MMPro-Etch-Docs/tree/main/ai-connector/mmpro-skills)`

## Out of scope (explicitly, per your answer)

- No GitHub Releases / zip-artifact build process — the link change above only fixes relative-path
  correctness and gives visitors a folder view to grab all files from; it's not a one-click zip download.
  That would be a separate, larger piece of work if wanted later.
- `.gitbook.yaml` and `SUMMARY.md` in `ai-connector/` — confirmed they don't reference the skills file
  directly, no changes needed.

## Verification (for when this plan is executed)

1. Re-read both new files in full; confirm every heading appears exactly once across the two combined,
   nothing dropped, nothing duplicated (combined line count ≈ original 1617, minus the ~6-line dedupe,
   plus a small amount of new bridging/header text).
2. Confirm the bundled `components/` folder has all 5 files and matches the originals byte-for-byte.
3. Confirm `mega-menu-pro-skills.md` no longer exists at the old `ai-connector/` location (moved, not
   duplicated).
4. Spot-check the dev-context and cheatsheet relative paths actually resolve from the new location.
5. Confirm `mmpro-dev-context.md` and `README.md` edits read correctly in context.
6. Report final line/token count for the main file vs. the original 1617/~40K, to confirm the reduction
   actually achieved.
7. Documentation-only work — no connector/live-site changes, no git commit/push (file changes only;
   confirm separately before any git operations, since `MMPro Etch Docs` is backed by a GitHub repo per
   the README's existing link).

---

**Status: planned, not yet executed.** This document is a saved reference copy for review across
machines — implementation has not started.
