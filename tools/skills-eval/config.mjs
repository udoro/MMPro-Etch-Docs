// Shared paths for the skills evaluation harness.
//
// Everything resolves from the repo this file lives in, so a checkout works on
// any machine. The one thing that cannot be derived is the sibling plugin repo
// (MMPRO ETCH), which holds the component exports and the engine source; set
// MMPRO_ROOT if yours is not a sibling of this repo.
//
//   MMPRO_ROOT   path to the MMPRO ETCH checkout
//   ETCH_PORT    connector daemon port (default 7332)
//   ETCH_TAB     connected builder tab name

import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

/** Walk up until we find the repo root (the folder holding ai-connector/). */
function findRepoRoot(from) {
  let dir = from;
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, 'ai-connector'))) return dir;
    const up = dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  throw new Error('could not locate the docs repo root (no ai-connector/ found above ' + from + ')');
}

export const DOCS_ROOT = findRepoRoot(here);
export const AI_CONNECTOR = join(DOCS_ROOT, 'ai-connector');
export const SKILLS_DIR = join(AI_CONNECTOR, 'mmpro-skills');

export const MMPRO_ROOT = process.env.MMPRO_ROOT
  ? resolve(process.env.MMPRO_ROOT)
  : join(dirname(DOCS_ROOT), 'MMPRO ETCH');

export const RELEASE_DIR = join(MMPRO_ROOT, 'RELEASE');
export const ENGINE_JS = join(MMPRO_ROOT, 'dwc-mega-menu-pro.js');

/** Newest component export in RELEASE/, by version in the filename. */
export function latestExport() {
  if (!existsSync(RELEASE_DIR)) throw new Error(`no RELEASE dir at ${RELEASE_DIR}; set MMPRO_ROOT`);
  const files = readdirSync(RELEASE_DIR)
    .filter((f) => /^Etch Mega Menu Pro .*\.json$/i.test(f) && !/backup|clean/i.test(f))
    .sort();
  if (!files.length) throw new Error(`no component export found in ${RELEASE_DIR}`);
  return join(RELEASE_DIR, files[files.length - 1]);
}

export const CONNECTOR = {
  port: process.env.ETCH_PORT || '7332',
  get evalUrl() { return `http://127.0.0.1:${this.port}/eval`; },
  get tabsUrl() { return `http://127.0.0.1:${this.port}/tabs`; },
  tab: process.env.ETCH_TAB || '',
};
