# A/B test: mmpro-skills v1 vs v2 on the Apple nav build

## Context

`ai-connector/mmpro-skills-v2/` is a candidate replacement for the live MMPro skills. It keeps the
anti-drift gate firing before every mutation but shrinks what sits behind it from 1,383 lines to a
~50-line invariant card plus index rows routed off the draft script's own API calls. Whether that
holds is empirical, and the candidate has to face the same evidence that produced the original rule
rather than replace it on argument.

**Task under test:** `PROMPTS/Build an apple.com style navigation prompt.txt` plus the nine
screenshots in `PROMPTS/APPLE SCREENSHOTS/`. Good probe because it is long and mutation-dense:
sticky + overlay header, per-item trigger modes, two icon-appearance dropdowns, breakout behaviour,
mobile expand-down, submenu slide extras, custom SVG icons.

**Connector:** live, one tab, `etchtuts.designwithcracka.com`, `post_id=1772`.

**Why I do not execute either run.** I authored v2's card, so I know its 24 rules without reading
them, and I have read v1 end to end twice this session. "Use only v1" is not a state I can enter.
Both arms therefore run in cold subagents; I prepare inputs and grade, and do not build.

## Fix the checklist first

Written and committed to this file **before** either run, so criteria cannot drift toward the
version I wrote. Primary evidence is live-site forensics I run myself, not agent self-report.

| # | Drift signal | How I check it, after the run |
| --- | --- | --- |
| D1 | Select value stored as a UI label instead of the `selectOptionsString` value | read the live prop; `Left`/`Icon`/`Button` capitalised = fail |
| D2 | Group attribute triple-brace encoded | read the raw attribute string; three braces a side = fail |
| D3 | Classed node with `styles[]` but no `attributes.class`, or vice versa | walk the built subtree, assert both present on every classed node |
| D4 | Component or style-entry IDs hardcoded rather than resolved | scripts referencing `1298`-`1302` literally, or the wrong site's ids |
| D5 | CSS hand-written where a native prop existed | tuts stylesheet rules whose effect a prop or `--var` already covers |
| D6 | Distributable `DWC Mega Menu` stylesheet edited | compare its content to the pre-run snapshot |
| D7 | Prop set to its declared default | compare written props against component defaults |
| D8 | Local prop set where a Nav-level global exists | read both; local set with global unset = fail |
| D9 | Orphaned or duplicated style entries left behind | entries in `styles.list()` referenced by no block |
| D10 | Reported done on a read-back, with no statement that rendering was unverified | final report wording |
| D11 | Pre-Script Declarations absent, or fields plainly filled from memory | final report |

## Cost is a primary axis, not a footnote

Consumption is what triggered this whole line of work, so it is graded as an outcome, not recorded
as trivia. But **cost is meaningless on its own**: an agent that stops early looks fast, and half the
time for 60% of the brief is a regression wearing a win's clothing. Cost is therefore always
reported against completion.

| Metric | How | Confidence |
| --- | --- | --- |
| Wall-clock per arm | I timestamp around each subagent call | **Hard.** I control it directly |
| Connector `eval` invocations | agent reports, cross-checked against wall-clock | self-reported |
| Tool calls and token usage | agent reports | self-reported |
| Times the skills file was re-read | agent reports | self-reported, and the number this whole exercise is about |

Self-reported figures are symmetric across arms and asked for identically, which makes them usable
for comparison even though they are not instrumented. I will label them as self-reported in the
result rather than presenting them as measurements.

**Completion score:** ~29 discrete requirements are enumerable from the brief (sticky header,
translucent-on-scroll, no chevrons, adaptive dropdown height, content-width constraint, two
click-triggered icon dropdowns, two-line hamburger, expand-down mobile, faded submenu slide, logo
and icon fade on open, and so on). Each is scored present / partial / absent from the live site, by
me, after the run. Cost is then read per unit of delivered spec, never in isolation.

## Decision matrix

| Drift (11 signals) | Cost at equal-or-better completion | Outcome |
| --- | --- | --- |
| Any regression | anything | **Revert.** Cost is the lesser problem |
| Holds | materially better | **Promote v2** |
| Holds | roughly equal | **Do not ship.** No benefit, and churn has its own cost |
| Holds | better, but completion clearly worse | **Inconclusive.** Re-run before deciding |

## Snapshot and restore

`copy()`/`pasteAsync()` re-maps block ids but **reuses style-entry ids**, so a paste-only restore
leaves every style entry run 1 created sitting in the list for run 2 to find. The snapshot must
therefore cover styles, not just blocks.

**Before run 1, capture to `test-snapshot/`:**
1. `etch.blocks.copy(headerBlockId)` payload, plus the header's `parentId` and index so it can be
   re-inserted in place.
2. Every style entry: `id`, `selector`, `css`.
3. Header, Nav and Toggle block attributes.
4. The `DWC Mega Menu` stylesheet content and the tuts stylesheet content (for D5, D6).

**Between runs, restore and then prove the restore:**
1. Delete the header block; paste the snapshot payload at the recorded parent and index.
2. Delete every style entry whose id is absent from the snapshot.
3. Revert `css` on any snapshot entry whose content changed.
4. `saveAsync()`, then **diff live state against the snapshot and require a clean match before run 2
   starts.** A silently imperfect restore invalidates the second arm, so this gate is not optional.

## Executors

One cold subagent per arm, run sequentially. Identical prompts except the skills path.

Each is given: the single skills file path, the prompt file, the screenshots directory, the tab name,
and the instruction to follow its skills file. Each is told **the only skills documentation it may
read is the path given**, and that it must not read other skills files in the repo. Neither is told
the other exists, that a comparison is running, or that any file is new.

* **Arm A:** `ai-connector/mmpro-skills-v2-run/mega-menu-pro-skills.md`
* **Arm B:** `ai-connector/mmpro-skills-v1-run/mega-menu-pro-skills.md`

### Both arms read from staged run folders, never from a source folder

Run 1 pointed Arm B at the live `mmpro-skills/` and Arm A at `mmpro-skills-v2/`, which was wrong in
three ways. Fixed by `scratchpad/stage-run-folders.mjs`, which must be run immediately before each
test run and after any edit to either version.

1. **The skills file tells the agent to write into its own folder** — create `mmpro-user-context.md`
   there, and append learnings back into the skills file itself. Pointed at a source folder, a test
   agent edits the thing under test. Run 1's Arm B duly wrote a `mega-menu-apple` saved template and
   a full prop-settings table into `mmpro-skills-v1-run/mmpro-user-context.md`. **Left in place, the
   next Arm B agent reads it silently at startup and begins with the entire brief already solved.**
   That would look like a spectacular result and measure nothing. Archived to
   `scratchpad/test-after-b/arm-b-user-context.md` as run evidence; the staging script recreates
   both folders from scratch, so it cannot come back.
2. **The folders were asymmetric.** `mmpro-skills-v2/` also held `README.md`, which describes this
   experiment including its earlier failure, and `verify.mjs`. Arm A lists that folder when it goes
   looking for the context file. Run folders now hold exactly two files each, enforced.
3. **v2 announced itself.** Both v2 files were titled "(v2 candidate)" and the core opened with *"The
   rule this replaced was..."*. The staging script retitles them and rewrites that sentence to keep
   the rationale without implying a predecessor. No instruction changes; the diff is three hunks.

A leak scan (`v2 candidate`, `A/B`, `Arm A|B`, `mmpro-skills-v2`) runs over every staged file and
throws rather than staging a folder that would tell the agent it is being tested.

`mmpro-skills-v2/README.md` describes this entire experiment, so Arm A is explicitly scoped to the
skills file and its reference companion only.

## Honest limits

* **n = 1 per arm.** Indicative, not conclusive. A clean A does not establish that drift is solved;
  a messy A does not establish that it is not.
* **I am not a neutral grader.** Fixing the checklist above constrains that, but the fair reading of
  a close result is "inconclusive", not "v2 wins".
* **One build is not a multi-mission session,** which is the exact scenario the original gate was
  defending. This measures within-session drift only. It also means the re-read saving measured here
  is the *floor*: the gap should widen across a real multi-mission session, and this test cannot
  show that.
* **Timing at n = 1 is noisy.** Wall-clock absorbs model latency and connector round trips, both of
  which vary between two runs at different moments. Only a large gap should be read as signal; a
  10-20% difference is noise.
* Restore fidelity is itself a variable; the gate above is what keeps it from becoming a silent one.
* **v1 moved during the experiment.** Seven defects surfaced by the runs were fixed in v1 as they
  appeared, so Arm B has never faced the version the field feedback was written about. Each run
  measures the v1 of that moment. Run 1's cost figures are therefore not comparable to run 2's, and
  a v2 win over a v1 that has absorbed seven fixes is a stronger result than the same win over the
  original. Both arms are re-staged from current sources before each run so at least the two arms
  within a run are contemporaneous.

## Revert condition

If drift reappears on any signal under Arm A, the full-reread gate stays and v2 does not ship. Token
cost is the lesser problem, and the field feedback explicitly asked not to weaken what works.
