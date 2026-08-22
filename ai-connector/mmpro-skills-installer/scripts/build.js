#!/usr/bin/env node

// Bundles a copy of the canonical skills and component docs into
// skills-package/ before publish, and writes the manifest the CLI uses to know
// which files exist.
//
// The bundle is the OFFLINE FALLBACK, not the primary path: bin/cli.js fetches
// the current files from the repo at install time and only falls back to this
// copy when the network is unavailable. It still has to be correct, because
// that fallback is what an offline user gets.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyRewrites,
  findStaleLinks,
  OUT_COMPONENTS_DIR,
  OUT_SKILLS_DIR,
  REPO_COMPONENTS_DIR,
  REPO_SKILLS_DIR,
} from "../lib/skills-source.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

const SOURCE_SKILLS = join(packageRoot, "..", "mmpro-skills");
const SOURCE_COMPONENTS = join(packageRoot, "..", "..", "components");

const OUT_ROOT = join(packageRoot, "skills-package");
const OUT_SKILLS = join(OUT_ROOT, OUT_SKILLS_DIR);
const OUT_COMPONENTS = join(OUT_ROOT, OUT_COMPONENTS_DIR);

// Committed to the repo so the CLI can fetch it and learn the current file
// list, even when files have been added since the last publish.
const REPO_MANIFEST_PATH = join(packageRoot, "..", "skills-manifest.json");

function markdownIn(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name)
    .sort();
}

function writeRewritten(srcDir, destDir, names) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });
  for (const name of names) {
    writeFileSync(join(destDir, name), applyRewrites(readFileSync(join(srcDir, name), "utf8")));
  }
}

const skills = markdownIn(SOURCE_SKILLS);
const components = markdownIn(SOURCE_COMPONENTS);

writeRewritten(SOURCE_SKILLS, OUT_SKILLS, skills);
writeRewritten(SOURCE_COMPONENTS, OUT_COMPONENTS, components);

const manifest = {
  generated: new Date().toISOString().slice(0, 10),
  skills: skills.map((n) => ({ repo: `${REPO_SKILLS_DIR}/${n}`, out: `${OUT_SKILLS_DIR}/${n}` })),
  components: components.map((n) => ({
    repo: `${REPO_COMPONENTS_DIR}/${n}`,
    out: `${OUT_COMPONENTS_DIR}/${n}`,
  })),
};
const json = JSON.stringify(manifest, null, 2) + "\n";
writeFileSync(REPO_MANIFEST_PATH, json);
writeFileSync(join(OUT_ROOT, "manifest.json"), json);

// A link left pointing at ../../ would silently 404 for every installed user,
// so fail the build rather than publish it.
let stale = 0;
for (const name of readdirSync(OUT_SKILLS)) {
  for (const link of findStaleLinks(readFileSync(join(OUT_SKILLS, name), "utf8"))) {
    console.error(`  unrewritten link in ${name}: ${link}`);
    stale++;
  }
}
if (stale) {
  console.error(`\n${stale} link(s) still point outside the package. Add a rule to PATH_REWRITE.`);
  process.exit(1);
}

console.log("Synced skills-package/ (offline fallback) from:");
console.log(`  ${SOURCE_SKILLS}`);
console.log(`  ${SOURCE_COMPONENTS}`);
console.log(`Manifest: ${skills.length} skills file(s), ${components.length} component doc(s)`);
