#!/usr/bin/env node

// Installs the Mega Menu Pro AI Connector skills into a project.
//
// The skills live in the docs repo and change more often than this package is
// published, so the current files are fetched at install time and the bundled
// copy is only a fallback for when the network is unavailable. Fetching is
// all-or-nothing: a partial fetch would mix a new skills file with stale
// component docs, which is worse than either source on its own.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const bundleRoot = join(packageRoot, "skills-package");

const DIRS = [OUT_SKILLS_DIR, OUT_COMPONENTS_DIR];
const TIMEOUT_MS = 10000;

function printHelp() {
  console.log(`
mmpro-agentic-skills-etch - install the Mega Menu Pro AI Connector skills files into a project

Usage:
  npx mmpro-agentic-skills-etch [directory] [options]

Options:
  --force, -f     Overwrite existing mmpro-skills/ or components/
  --offline       Skip the network and install the copy bundled with this package
  --ref <ref>     Install from a branch or tag (default: ${DEFAULT_REF})
  --help, -h      Show this help message

By default the current skills are fetched from ${REPO} so they are never
older than this package. Without a network the bundled copy is used instead.

Examples:
  npx mmpro-agentic-skills-etch
  npx mmpro-agentic-skills-etch ./my-site-project
  npx mmpro-agentic-skills-etch --offline --force
`);
}

function parseArgs(argv) {
  const options = { force: false, help: false, offline: false, ref: DEFAULT_REF, target: process.cwd() };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--force" || arg === "-f") options.force = true;
    else if (arg === "--offline") options.offline = true;
    else if (arg === "--ref") {
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
  } finally {
    clearTimeout(timer);
  }
}

function bundledManifest() {
  return JSON.parse(readFileSync(join(bundleRoot, "manifest.json"), "utf8"));
}

/** Returns { files: [{out, content}] } or null if anything at all went wrong. */
async function fetchLive(ref) {
  let manifest;
  try {
    manifest = JSON.parse(await get(rawUrl(ref, REPO_MANIFEST)));
  } catch {
    // The manifest may predate this feature on an older ref; the bundled list
    // is still a reasonable guess at what to fetch.
    try {
      manifest = bundledManifest();
    } catch {
      return null;
    }
  }

  const entries = [...(manifest.skills || []), ...(manifest.components || [])];
  if (entries.length === 0) return null;

  const files = [];
  for (const entry of entries) {
    let text;
    try {
      text = await get(rawUrl(ref, entry.repo));
    } catch {
      return null;
    }
    if (!looksLikeMarkdown(text)) return null;
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

function copyBundle(target) {
  for (const dir of DIRS) {
    const source = join(bundleRoot, dir);
    if (existsSync(source)) cpSync(source, join(target, dir), { recursive: true });
  }
}

function countComponents(target) {
  try {
    return readdirSync(join(target, OUT_COMPONENTS_DIR)).filter((f) => f.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

async function main() {
  const { force, help, offline, ref, target } = parseArgs(process.argv.slice(2));

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

  mkdirSync(target, { recursive: true });

  let source;
  if (offline) {
    copyBundle(target);
    source = "the copy bundled with this package (--offline)";
  } else {
    const files = await fetchLive(ref);
    if (files) {
      writeFiles(target, files);
      source = `${REPO} (${ref})`;
    } else {
      copyBundle(target);
      source = "the copy bundled with this package (network unavailable)";
    }
  }

  console.log(`Installed Mega Menu Pro AI Connector skills to ${target}`);
  console.log(`  source: ${source}`);
  console.log(`  ${OUT_SKILLS_DIR}/mega-menu-pro-skills.md          (entry point, read this first)`);
  console.log(`  ${OUT_SKILLS_DIR}/mega-menu-pro-skills-build.md    (full workflow)`);
  console.log(`  ${OUT_SKILLS_DIR}/mega-menu-pro-skills-reference.md (lookup tables)`);
  console.log(`  ${OUT_COMPONENTS_DIR}/ (${countComponents(target)} component prop docs)`);
  console.log(`\nPoint your AI coding agent at ${OUT_SKILLS_DIR}/mega-menu-pro-skills.md to load it.`);
  console.log('Then tell the agent: "npx @digital-gravy/etch-connector serve"');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
