#!/usr/bin/env node

// Installs the Mega Menu Pro AI Connector skills into a project.
//
// The skills live in the docs repo and change more often than this package is
// published, so the current files are fetched at install time. There is no
// bundled fallback: a copy frozen at publish time goes stale with every docs
// change, and an agent can't tell old docs from current ones. Fetching is
// all-or-nothing, and nothing is written until every file has arrived, so a
// failed install leaves the target untouched.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import {
  applyRewrites,
  DEFAULT_REF,
  looksLikeMarkdown,
  OUT_COMPONENTS_DIR,
  OUT_SKILLS_DIR,
  rawUrl,
  REPO,
  REPO_MANIFEST,
} from "../lib/skills-source.js";

const DIRS = [OUT_SKILLS_DIR, OUT_COMPONENTS_DIR];
const TIMEOUT_MS = 10000;

function printHelp() {
  console.log(`
mmpro-agentic-skills-etch - install the Mega Menu Pro AI Connector skills files into a project

Usage:
  npx mmpro-agentic-skills-etch [directory] [options]

Options:
  --force, -f     Overwrite existing mmpro-skills/ or components/
  --ref <ref>     Install from a branch or tag (default: ${DEFAULT_REF})
  --help, -h      Show this help message

The current skills are downloaded from ${REPO} on GitHub.

Examples:
  npx mmpro-agentic-skills-etch
  npx mmpro-agentic-skills-etch ./my-site-project
`);
}

function parseArgs(argv) {
  const options = { force: false, help: false, ref: DEFAULT_REF, target: process.cwd() };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--force" || arg === "-f") options.force = true;
    else if (arg === "--offline") {
      console.error("--offline was removed in 0.3.0. The installer downloads the current skills from GitHub.");
      process.exit(1);
    } else if (arg === "--ref") {
      options.ref = argv[++i];
      if (!options.ref) {
        console.error("--ref needs a branch or tag name");
        process.exit(1);
      }
    } else if (!arg.startsWith("-")) options.target = resolve(arg);
    else {
      console.error(`Unknown option: ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  return options;
}

async function get(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { "user-agent": "mmpro-agentic-skills-etch" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    throw new Error(err.name === "AbortError" ? `no answer after ${TIMEOUT_MS / 1000} s` : err.message || String(err));
  } finally {
    clearTimeout(timer);
  }
}

/** Returns [{out, content}] for every file, or throws naming the file that failed. */
async function fetchLive(ref) {
  let manifest;
  try {
    manifest = JSON.parse(await get(rawUrl(ref, REPO_MANIFEST)));
  } catch (err) {
    throw new Error(`${REPO_MANIFEST}: ${err.message}`);
  }

  const entries = [...(manifest.skills || []), ...(manifest.components || [])];
  if (entries.length === 0) throw new Error(`${REPO_MANIFEST} lists no files`);

  const files = [];
  for (const entry of entries) {
    let text;
    try {
      text = await get(rawUrl(ref, entry.repo));
    } catch (err) {
      throw new Error(`${entry.repo}: ${err.message}`);
    }
    if (!looksLikeMarkdown(text)) throw new Error(`${entry.repo}: the download isn't a Markdown file`);
    files.push({ out: entry.out, content: applyRewrites(text) });
  }
  return files;
}

function writeFiles(target, files) {
  for (const file of files) {
    const dest = join(target, file.out);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, file.content);
  }
}

async function main() {
  const { force, help, ref, target } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  const conflicts = DIRS.filter((dir) => existsSync(join(target, dir))).map((dir) => `${dir}/`);
  if (conflicts.length > 0 && !force) {
    console.error("Installation blocked, the following already exist:");
    for (const conflict of conflicts) console.error(`  ${conflict}`);
    console.error("\nRe-run with --force to overwrite.");
    process.exit(1);
  }

  let files;
  try {
    files = await fetchLive(ref);
  } catch (err) {
    console.error(`Couldn't download the skills from GitHub (${REPO}, ${ref}).`);
    console.error(`  ${err.message}`);
    console.error("\nNothing was installed. Check that you can reach raw.githubusercontent.com, then run it again.");
    // Not process.exit(): on Windows it aborts Node while the fetch socket is still closing.
    process.exitCode = 1;
    return;
  }

  mkdirSync(target, { recursive: true });
  writeFiles(target, files);
  const components = files.filter((f) => f.out.startsWith(`${OUT_COMPONENTS_DIR}/`)).length;

  console.log(`Installed Mega Menu Pro AI Connector skills to ${target}`);
  console.log(`  source: ${REPO} (${ref})`);
  console.log(`  ${OUT_SKILLS_DIR}/mega-menu-pro-skills.md          (entry point, read this first)`);
  console.log(`  ${OUT_SKILLS_DIR}/mega-menu-pro-skills-build.md    (full workflow)`);
  console.log(`  ${OUT_SKILLS_DIR}/mega-menu-pro-skills-reference.md (lookup tables)`);
  console.log(`  ${OUT_COMPONENTS_DIR}/ (${components} component prop docs)`);
  console.log(`\nPoint your AI coding agent at ${OUT_SKILLS_DIR}/mega-menu-pro-skills.md to load it.`);
  console.log('Then tell the agent: "npx @digital-gravy/etch-connector serve"');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
