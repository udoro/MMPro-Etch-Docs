#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const sourceRoot = join(packageRoot, "skills-package");

const DIRS = ["mmpro-skills", "components"];

function printHelp() {
  console.log(`
mmpro-agentic-skills-etch — install the Mega Menu Pro AI Connector skills files into a project

Usage:
  npx mmpro-agentic-skills-etch [directory] [options]

Options:
  --force, -f    Overwrite existing mmpro-skills/ or components/
  --help, -h     Show this help message

Examples:
  npx mmpro-agentic-skills-etch
  npx mmpro-agentic-skills-etch ./my-site-project
  npx mmpro-agentic-skills-etch --force
`);
}

function parseArgs(argv) {
  const options = { force: false, help: false, target: process.cwd() };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--force" || arg === "-f") {
      options.force = true;
    } else if (!arg.startsWith("-")) {
      options.target = resolve(arg);
    } else {
      console.error(`Unknown option: ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  return options;
}

function listConflicts(target) {
  return DIRS.filter((dir) => existsSync(join(target, dir))).map((dir) => `${dir}/`);
}

function copyPackageFiles(target, force) {
  mkdirSync(target, { recursive: true });

  for (const dir of DIRS) {
    const source = join(sourceRoot, dir);
    const dest = join(target, dir);

    if (existsSync(dest) && !force) {
      continue;
    }

    cpSync(source, dest, { recursive: true });
  }
}

function main() {
  const { force, help, target } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  const conflicts = listConflicts(target);

  if (conflicts.length > 0 && !force) {
    console.error("Installation blocked — the following already exist:");
    for (const conflict of conflicts) {
      console.error(`  ${conflict}`);
    }
    console.error("\nRe-run with --force to overwrite.");
    process.exit(1);
  }

  copyPackageFiles(target, force);

  console.log(`Installed Mega Menu Pro AI Connector skills to ${target}`);
  console.log(`  mmpro-skills/mega-menu-pro-skills.md`);
  console.log(`  mmpro-skills/mega-menu-pro-skills-reference.md`);
  console.log(`  components/ (5 component prop docs)`);
  console.log("\nPoint your AI coding agent at mmpro-skills/mega-menu-pro-skills.md to load it.");
  console.log('Then tell the agent: "npx @digital-gravy/etch-connector serve"');
}

main();
