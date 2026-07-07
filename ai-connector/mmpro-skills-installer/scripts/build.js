#!/usr/bin/env node

// Syncs the canonical skills/reference/component docs into skills-package/
// before publish. Source files stay single-source in ../mmpro-skills and
// ../../components — this script is the only place that duplicates them,
// and it rewrites the relative path used to link them so the copies work
// standalone once installed one folder shallower in a user's project.

import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

const SOURCE_SKILLS = join(packageRoot, "..", "mmpro-skills");
const SOURCE_COMPONENTS = join(packageRoot, "..", "..", "components");

const OUT_ROOT = join(packageRoot, "skills-package");
const OUT_SKILLS = join(OUT_ROOT, "mmpro-skills");
const OUT_COMPONENTS = join(OUT_ROOT, "components");

// Source repo nests mmpro-skills/ two levels below the repo root
// (ai-connector/mmpro-skills/), so it references components/ as ../../components/.
// The installed package is one level shallower (mmpro-skills/ directly under the
// target project root), so that becomes ../components/.
const PATH_REWRITE = [[/\.\.\/\.\.\/components\//g, "../components/"]];

function copyMarkdownWithRewrite(srcDir, destDir) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });

  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

    let content = readFileSync(join(srcDir, entry.name), "utf8");
    for (const [pattern, replacement] of PATH_REWRITE) {
      content = content.replace(pattern, replacement);
    }
    writeFileSync(join(destDir, entry.name), content);
  }
}

function copyComponents(srcDir, destDir) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });
  cpSync(srcDir, destDir, { recursive: true });
}

copyMarkdownWithRewrite(SOURCE_SKILLS, OUT_SKILLS);
copyComponents(SOURCE_COMPONENTS, OUT_COMPONENTS);

console.log(`Synced skills-package/ from:`);
console.log(`  ${SOURCE_SKILLS}`);
console.log(`  ${SOURCE_COMPONENTS}`);
