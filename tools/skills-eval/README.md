# skills-eval

Harness for testing changes to the MMPro AI Connector skills against a live Etch
install, and for maintaining the generated prop tables.

Everything resolves paths from the repo, so a fresh checkout works on any
machine. The only thing that cannot be derived is the sibling plugin repo.

## Setup

```sh
npx @digital-gravy/etch-connector serve     # leave running
```

Connect a builder tab, then confirm:

```sh
npx @digital-gravy/etch-connector tabs      # must list the site
```

Environment, all optional:

| Variable | Default | Use |
| --- | --- | --- |
| `MMPRO_ROOT` | sibling `MMPRO ETCH` folder | where the component exports and engine live |
| `ETCH_PORT` | `7332` | connector daemon port |
| `ETCH_TIMEOUT` | `120000` | eval timeout in ms; the 30s default is too short for a full snapshot |

## Running a comparison

The unit of work is: snapshot, run an agent against one skills version, snapshot
again, grade, restore, repeat for the other version.

```sh
node stage-run-folders.mjs                  # copy each version into its own run folder
sh capture.sh baseline                      # snapshot before
node latency.mjs pre-arm-a 5                # bracket the run; connector latency varies
#   ... run the agent, pointed at a run folder ...
sh capture.sh after-arm-a
node latency.mjs post-arm-a 3
node audit-offline.mjs after-arm-a > audit-a.json
node grade-diff.mjs audit-baseline.json audit-a.json
node gen-restore.mjs after-arm-a && node etch.mjs restore.js
```

**Why run folders.** The skills file instructs an agent to write findings back
into itself and to create `mmpro-user-context.md` beside it. Pointed at
`mmpro-skills/` an agent edits the thing under test. `stage-run-folders.mjs`
copies each version into a throwaway folder, strips anything identifying it as a
candidate, and refuses to stage a folder that would tell the agent it is being
tested.

### What to wrap around the task

The task itself is yours: give the agent whatever you actually want built or
corrected, in your own words. What the harness needs is only the scaffolding
around it, and each line earns its place:

* **Point at the entry file**, and say that it, the companions it names, and
  `components/` are the only documentation the agent may read. Without this an
  agent finds another version in the repo and you no longer know what you tested.
* **Tell it to keep temp scripts in a subdirectory of its own** and not to delete
  files from shared directories. One run deleted a grading script because its own
  temp file had the same name.
* **Ask for a metrics block**: connector eval calls, tool calls, lines read per
  skills file and whether any was read in full, full schema dumps, and whether it
  reached `configuration` or `rendered` verification. Ask for honesty over a
  good-looking number; agents have reported their own wasted calls when asked
  this way.
* **For a destructive build**, pre-approve the scope and any naming decision, and
  note that a timed-out eval usually still completes, so live state should be
  re-read before re-running it.

Keep the wording identical across arms except the skills path. Everything else is
a variable you did not mean to introduce.

**Why the latency probes.** Wall-clock differences under about 15% are noise:
two versions swapped places by 10% in both directions across four runs on
identical documents. `latency.mjs` logs connector round-trip time before and
after each arm to `latency.log`, so "the network was slow" becomes a number.

## Grading

`grade-diff.mjs` scores an arm **against the baseline**, not against an ideal.
Graded absolutely, an untouched install fails several signals: Etch serialises a
component's whole group including defaults, the install ships style entries the
page does not reference, and the demo nav already uses a per-item override. Those
are properties of the install, not agent drift.

It self-validates: grading the baseline against itself must pass every signal.

Signals cover select values stored as UI labels, group-attribute brace depth,
class and `styles[]` travelling together, props written to their own default,
and orphaned style entries. Stylesheet edits and the verification level reached
are checked separately, from the sheets snapshot and the agent's own report.

## Restoring between arms

`gen-restore.mjs <after-dir>` writes `restore.js`, which pastes the snapshot
header back, deletes style entries the arm created, reverts CSS it changed, and
removes any stylesheet it added. `gen-restore-built.mjs` does the same against a
**finished build** rather than the demo nav, which is what a correction test
needs.

Always gate on a clean diff before the next arm:

```sh
node diff-state.mjs baseline after-restore     # entries, stylesheets, tree size
node struct-diff.mjs baseline after-restore    # 198 nodes, by structure not id
```

`struct-diff.mjs` compares by document position rather than block id, because a
paste-based restore re-mints every id and an id-keyed diff reports every node as
both added and removed.

## Maintaining the prop tables

`../gen-prop-tables.mjs` regenerates Section 4 of the reference from the
component export, including a per-component fingerprint. Run it after any
release that changes a component:

```sh
node ../gen-prop-tables.mjs --json "<export>.json" --label 1.2.2 \
  --splice ../../ai-connector/mmpro-skills/mega-menu-pro-skills-reference.md
```

Then confirm the emitted fingerprints match a live install:

```sh
node etch.mjs snapshot/fingerprint.js
```

A mismatch means the table describes a different version than the site runs. The
live install always wins.

## Cleaning a component export

`legacy-audit.mjs` lists stored values on blocks that no component declares any
more. `clean-export.mjs` removes them from the demo content inside an export,
and `verify-clean.mjs` proves the result differs from the original **only** by
removals, with nothing added or altered.

```sh
node legacy-audit.mjs "<export>.json" audit-baseline.json
node clean-export.mjs "<export>.json" --write "<export>-clean.json"
node verify-clean.mjs "<export>.json" "<export>-clean.json"
```

Component IDs are install-local and are never written into documentation.
Nested groups are declared at their full path; a classifier that only checks
top-level group names will report them as legacy when they are not.
