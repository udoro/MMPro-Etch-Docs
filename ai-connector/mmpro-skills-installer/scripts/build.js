#!/usr/bin/env node

// Writes the manifest bin/cli.js fetches to learn which files to install, and
// checks every file it lists for links that would break once installed. Run it
// after adding, removing or renaming a skills file or component doc, then commit
// ai-connector/skills-manifest.json: the CLI reads the copy on GitHub.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
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
const REPO_MANIFEST_PATH = join(packageRoot, "..", "skills-manifest.json");

function markdownIn(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name)
    .sort();
}

const skills = markdownIn(SOURCE_SKILLS);
const components = markdownIn(SOURCE_COMPONENTS);

const manifest = {
  generated: new Date().toISOString().slice(0, 10),
  skills: skills.map((n) => ({ repo: `${REPO_SKILLS_DIR}/${n}`, out: `${OUT_SKILLS_DIR}/${n}` })),
  components: components.map((n) => ({
    repo: `${REPO_COMPONENTS_DIR}/${n}`,
    out: `${OUT_COMPONENTS_DIR}/${n}`,
  })),
};
writeFileSync(REPO_MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

// Installed, only mmpro-skills/ and components/ exist side by side, so a link
// out of either folder 404s for every user. Fail rather than ship it.
let broken = 0;
for (const name of skills) {
  for (const link of findStaleLinks(applyRewrites(readFileSync(join(SOURCE_SKILLS, name), "utf8")))) {
    console.error(`  unrewritten link in ${OUT_SKILLS_DIR}/${name}: ${link}`);
    broken++;
  }
}
for (const name of components) {
  const text = readFileSync(join(SOURCE_COMPONENTS, name), "utf8");
  for (const [, link] of text.matchAll(/\]\((\.\.\/[^)]+)\)/g)) {
    console.error(`  link out of ${OUT_COMPONENTS_DIR}/ in ${name}: ${link} (use the full GitBook URL)`);
    broken++;
  }
}
if (broken) {
  console.error(`\n${broken} link(s) would break in an installed project.`);
  process.exit(1);
}

console.log(`Manifest: ${skills.length} skills file(s), ${components.length} component doc(s)`);
console.log(`  ${REPO_MANIFEST_PATH}`);
