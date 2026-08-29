// Stage skills versions into throwaway run folders, one per arm.
//
// Why this exists: the skills file tells an agent to write findings back into
// itself and to create mmpro-user-context.md beside it. Pointed at the real
// mmpro-skills/ folder, an agent edits the thing under test. Pointed at a run
// folder, it writes into a copy that is recreated before every run.
//
// The folders must also be SYMMETRIC. Anything present for one arm and not the
// other is a variable you did not mean to introduce: no README describing the
// experiment, no leftover context file, and nothing in the text that tells an
// agent it is reading a candidate.
//
// Usage:
//   node stage-run-folders.mjs                       # stage mmpro-skills alone
//   node stage-run-folders.mjs mmpro-skills my-candidate
//
// Each named folder is copied to <name>-run.

import { readFileSync, writeFileSync, rmSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { AI_CONNECTOR } from './config.mjs';

const args = process.argv.slice(2);
const sources = args.length ? args : ['mmpro-skills'];

// Anything that would tell an agent it is being tested rather than used.
const LEAKS = [/\(v\d+ candidate\)/i, /\bA\/B\b/, /\bArm [AB]\b/, /candidate, not in use/i];

// Strip a parenthetical version marker from a heading, e.g.
// "# AI Skills Reference (v2 candidate)" -> "# AI Skills Reference".
const neutralise = (text) => text.replace(/^(#{1,3} .*?)\s*\(v\d+ candidate\)\s*$/gim, '$1');

for (const src of sources) {
  const from = join(AI_CONNECTOR, src);
  const to = join(AI_CONNECTOR, `${src}-run`);

  if (!existsSync(from) || !statSync(from).isDirectory()) {
    throw new Error(`no such skills folder: ${from}`);
  }

  // Delete the FILES, not the directory. Cloud-synced folders (OneDrive and the
  // like) hold a handle on the directory and rmSync on it throws EPERM
  // intermittently, which silently leaves the previous run's files in place.
  mkdirSync(to, { recursive: true });
  for (const f of readdirSync(to)) rmSync(join(to, f), { recursive: true, force: true });

  const files = readdirSync(from).filter((f) => f.endsWith('.md'));
  if (!files.length) throw new Error(`${src}: no markdown files to stage`);

  for (const file of files) {
    const text = neutralise(readFileSync(join(from, file), 'utf8'));
    for (const re of LEAKS) {
      const hit = text.match(re);
      if (hit) throw new Error(`${src}-run/${file}: leaked "${hit[0]}"; neutralise it before staging`);
    }
    writeFileSync(join(to, file), text);
  }

  const got = readdirSync(to);
  if (got.length !== files.length) {
    throw new Error(`${src}-run: expected ${files.length} files, found ${got.join(', ')}`);
  }
  console.log(`${(src + '-run').padEnd(24)} <- ${src.padEnd(18)} ${got.join(', ')}`);
}

if (sources.length > 1) {
  const counts = sources.map((s) => readdirSync(join(AI_CONNECTOR, `${s}-run`)).length);
  if (new Set(counts).size !== 1) {
    throw new Error(`arms are asymmetric: ${sources.map((s, i) => `${s}=${counts[i]}`).join(', ')}`);
  }
  console.log('\nall arms staged and symmetric.');
}
