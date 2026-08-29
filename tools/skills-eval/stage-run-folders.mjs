// Stage the two A/B run folders from their sources. Idempotent — run it immediately
// before each test run, after any edit to either version.
//
// Why run folders exist at all: the skills file orders the agent to create
// `mmpro-user-context.md` in its own folder and to append learnings back into itself.
// Pointed at a source folder, a test agent edits the thing under test. Pointed at a run
// folder, it writes into a throwaway.
//
// The folders must also be SYMMETRIC. Anything present for one arm and not the other is a
// variable. That means: exactly two files each, no README, no verify.mjs, and no string
// telling the agent it is reading a candidate or that a comparison is running.

import { AI_CONNECTOR } from './config.mjs';
import { readFileSync, writeFileSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import * as fs from 'node:fs';

const BASE = AI_CONNECTOR + '/';
const CORE = 'mega-menu-pro-skills.md';
const REF = 'mega-menu-pro-skills-reference.md';
// v1 is now a small entry file plus a build file plus the reference. v2 is
// unchanged (two files); it is a decided negative result and is not being
// developed further, so parity is deliberately broken here.
const BUILD = 'mega-menu-pro-skills-build.md';

// [source folder, run folder, text substitutions applied to the copy]
const ARMS = [
  ['mmpro-skills', 'mmpro-skills-v1-run', []],
  ['mmpro-skills-v2', 'mmpro-skills-v2-run', [
    ['# AI Skills Reference (v2 candidate)', '# AI Skills Reference'],
    ['# AI Skills Reference — Lookup Companion (v2 candidate)', '# AI Skills Reference — Lookup Companion'],
    // Keeps the rationale, drops the "this replaced X" framing that reveals a predecessor.
    [`The rule this replaced was "re-read all 1,383 lines before any edit". That rule existed for a real
reason: agents read the skills once, then drift back onto general web-development instinct as a
session runs, and start guessing facts they had already been told. Reading once was demonstrably not
enough, and the full re-read is what stopped it.`,
     `You re-ground yourself in this file before every mutation, and that requirement exists for a real
reason: agents read the skills once, then drift back onto general web-development instinct as a
session runs, and start guessing facts they had already been told. Reading once is demonstrably not
enough. Re-grounding is what stops it.`],
  ]],
];

// Any of these surviving into a run folder would tell the agent it is being tested.
const LEAKS = [/v2 candidate/i, /\bA\/B\b/, /\bArm [AB]\b/, /mmpro-skills-v2/];

for (const [src, run, subs] of ARMS) {
  // Delete the FILES, not the directory. OneDrive keeps a handle on synced
  // folders and rmSync on the directory itself intermittently throws EPERM,
  // which silently leaves the previous run's files in place.
  mkdirSync(BASE + run, { recursive: true });
  for (const f of readdirSync(BASE + run)) rmSync(BASE + run + "/" + f, { recursive: true, force: true });

  const files = fs.existsSync(BASE + src + '/' + BUILD) ? [CORE, REF, BUILD] : [CORE, REF];
  for (const file of files) {
    let text = readFileSync(BASE + src + '/' + file, 'utf8');
    for (const [from, to] of subs) {
      // Only the substitutions belonging to this file will match; that is expected.
      if (text.includes(from)) text = text.split(from).join(to);
    }
    for (const re of LEAKS) {
      const hit = text.match(re);
      if (hit) throw new Error(`${run}/${file}: leaked "${hit[0]}" — neutralise it in ARMS`);
    }
    writeFileSync(BASE + run + '/' + file, text);
  }

  const got = readdirSync(BASE + run);
  if (got.length !== files.length) throw new Error(`${run}: expected ${files.length} files, found ${got.join(', ')}`);
  console.log(`${run.padEnd(20)} <- ${src.padEnd(16)} ${got.join(', ')}`);
}

console.log('\nboth arms staged and symmetric.');
