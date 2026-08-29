# mmpro-skills-v2 — candidate, not in use

An experimental rewrite of the MMPro Agentic Skills. **Nothing here ships.** The live skills are
`../mmpro-skills/`, untouched and byte-identical to what they were before this folder existed.

## Why

Field feedback flagged that the agent re-reads the whole 1,383-line `mega-menu-pro-skills.md` before
every mission, and asked whether the full bootstrap could be avoided.

It can be reduced, but **not by re-reading less often**. The re-read is an anti-drift mechanism with
evidence behind it: agents read the skills once, then drift back onto general web-development
instinct as a session runs and start guessing facts they were already told. The live file says so
itself, under "Execution discipline": *"Reading docs once at the beginning creates awareness — it
does not replace consulting them at each decision point during execution."*

So the frequency is unchanged. Only the **per-mutation volume** is.

## What the first test run found (and why the design changed)

The first build attempt under this candidate **failed**, and the failure is recorded here because it
determined the current shape.

The agent went trawling the 188KB distributable `DWC Mega Menu` stylesheet, trying to derive from
CSS whether setting `arrowVisibilty: Hide` globally would also destroy the Search and Bag icons. The
live skills answer that in one sentence: *"When `useCustomSvg` is on, the arrow automatically
disappears."* The first cut of this candidate had moved that sentence, along with the whole
goal-to-action table, into the reference file. So the agent had a real gap and went hunting.

Worse, it was not breaking a rule while doing so. The invariant card said *"Read it for debugging
only"* — the first cut had taken a prohibition and promoted its exception onto a card the agent
reads before every single mutation.

**The classification error behind both.** Content was sorted into "intent rules" and "silent-failure
rules", with anything that fails loudly left out of the core. That taxonomy has no slot for a third
kind of content:

> **Maps.** Material that does not prevent a *wrong action*, but prevents an *expensive route to a
> right one.*

A goal-to-action table is not a rule at all. Omitting it produces no defect, only cost — and cost
was the entire point of the exercise, so the first cut optimised away the thing doing the work.

**The correction, and the thing worth remembering:** shrinking the once-per-session core bought
almost nothing. The saving was always in the *repeated* re-read, and that comes entirely from the
card. Two separate goals had been conflated. So maps and gotchas went back into the core, and only
procedures and recipes stayed in the reference.

## What this candidate actually changes

**1. The gate points at a card, not the whole file.** `§0 Operating Invariants` is 24 rules on about
one page, re-read before every mutation exactly as the full file was. That is the entire saving.

**2. Routing is driven by the script, not by self-assessment.** A drifted agent cannot be asked to
choose what to look up, because it will not look up a rule it has forgotten exists. `§0.1 Method
Index` keys off the `etch.*` methods in the draft script, read off its own code. `§0.2 Task Index`
keys off the task given. Agent-initiated Grep exists but is never load-bearing.

**3. The Pre-Script Declaration cannot be answered from memory.** The old
`Skills file sections re-read:` field could be filled from a stale recollection and looked identical
to a correct answer. It now requires a **verbatim quote plus invariant ID** for every rule relied on.
Inability to quote is defined as the drift signal, with a mandatory Grep before continuing.
*(This part worked on the first run: the agent produced real quotes, correct IDs, and reported
`Verification reached: CONFIG ONLY` unprompted.)*

**4. Verification must name the level it reached.** `INV-24`: a value that persisted is not a value
that rendered.

**5. Duplication removed.** ~35 lines that restated the Tier 1-4 hierarchy verbatim — the same
`inspect-schema.js` block, CLI command, declaration sentence and tier list, all twice.

**6. A real bug fixed in passing.** The canonical `getGroup` under "Core helpers (include at top of
every script)" was the unguarded version, while the gotchas called the guard mandatory and Appendix
A.4 carried a second corrected copy. Any agent following the instruction shipped the broken one.

**7. Appending has a compaction half,** and anything appended must be routed onto the card or an
index, or it is a rule no agent will ever reach.

## Shape

| | live (`../mmpro-skills/`) | this candidate |
| --- | --- | --- |
| Core file | 1,383 lines | 1,094 lines |
| Reference file | 457 lines | 918 lines |
| **Re-read per mutation** | **1,383 lines** | **~50** (card + matching index rows) |
| Read once at session start | 1,383 | 1,094 |

The core is only modestly smaller, deliberately. It keeps every map and every gotcha. The reference
holds procedures and lookup tables only: how to perform an operation, or one value to read.

## What did NOT change

* `../mmpro-skills/` is untouched.
* No Slider Pro file was touched.
* Not wired into anything. `mmpro-skills-installer/scripts/build.js` reads `../mmpro-skills`
  specifically, `skills-manifest.json` pins explicit paths, and `SUMMARY.md` lists only the README,
  so this folder can reach neither npm nor GitBook by accident.

## Verifying the files

```bash
# from ai-connector/
node mmpro-skills-v2/verify.mjs
```

Checks that every cited `INV-` id is defined, that all 110 distinctive technical tokens from the
original core still exist somewhere in v2, that no cross-reference points at a moved section without
naming the reference file, that component links sit at the same depth, and that the unguarded
`getGroup` is gone.

**Passing this only proves nothing was lost.** It says nothing about drift or cost — the first run
passed every one of these checks and still failed in practice.

## Testing whether it actually works

1. Build a long, mutation-dense task (the Apple.com nav brief is the one used so far) in a cold
   agent given only this folder.
2. Watch for the failure mode above: any sign of the agent deriving prop behaviour from CSS,
   inspecting the distributable stylesheet, or exploring to find what a control does. That is the
   signature of a missing map.
3. Run the same task against `../mmpro-skills/` for comparison, from an identical starting state.
4. Compare wall-clock **against a completion score**, never alone. An agent that stops early looks
   fast.

**Revert condition:** if drift or hunting reappears, the full-reread gate stays. Token cost is the
lesser problem, and the field feedback explicitly asked not to weaken what already works.
