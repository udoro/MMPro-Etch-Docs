#!/usr/bin/env node

// Generates the prop-reference tables for the MMPro AI Connector skills from the
// Etch component export. The export is the only authority for prop KEYS and
// defaults; hand-transcribing them is how a reference goes quietly wrong.
//
// Ported from the Slider Pro generator (SLIDER-PRO-ETCH/tools/gen-prop-tables.mjs).
//
// Usage:
//   node tools/gen-prop-tables.mjs [--json "<path>/Etch Mega Menu Pro + Header Builder v1.2.1.json"]
//                                  [--engine "<path>/dwc-mega-menu-pro.js"]
//                                  [--label v1.2.1]
//                                  [--out fragment.md | --splice path/to/reference.md]
//
// With no --out and no --splice it prints to stdout, plus a coverage report on
// stderr. --splice replaces only the region between the GENERATED:PROPS markers,
// so hand-written parts of the reference survive regeneration.
//
// Three shapes in the export decide whether this is right or useless:
//
//   * A "group" node is a CONTAINER and DOES contribute a path segment
//     (general.appearance).
//   * A "condition" node is also a container but is TRANSPARENT for pathing:
//     the panel nests it, the value path does not.
//   * Panel section headings are NOT path segments. Within DWC Dropdown's single
//     "General" panel section, Text is `text` while Appearance is
//     `general.appearance`. Only the export knows which is which, which is the
//     whole reason this file exists.
//
// What is deliberately NOT generated: component IDs. The export numbers DWC
// Dropdown 13; a live install numbers it something else entirely. IDs are
// install-local and must always be resolved by name at runtime.

import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};

const MM = 'c:/Users/udoro/OneDrive/Desktop/works/VSCode Workspace/MMPRO ETCH/';
const JSON_PATH = arg('--json', MM + 'RELEASE/Etch Mega Menu Pro + Header Builder v1.2.1.json');
const ENGINE_PATH = arg('--engine', MM + 'dwc-mega-menu-pro.js');
const OUT_PATH = arg('--out', null);
const SPLICE_PATH = arg('--splice', null);

const doc = JSON.parse(readFileSync(JSON_PATH, 'utf8'));

// The plugin version lives in the export's filename, not in the payload; the
// payload's own `version` is the export FORMAT version. Stamping the table with
// the wrong one would defeat the point of stamping it at all.
const LABEL = arg('--label', (basename(JSON_PATH).match(/v(\d+\.\d+(?:\.\d+)?)/) || [, 'unknown'])[1]);

/* ── props ─────────────────────────────────────────────────────────────── */

/**
 * Flatten one component's property tree.
 *
 * @param {object[]} props Property nodes.
 * @param {string}   path  Dotted prefix already accumulated, e.g. "general.".
 * @param {string}   when  Condition expression currently in force, if any.
 * @returns {object[]}
 */
function flatten(props, path = '', when = '') {
  const out = [];
  for (const p of props || []) {
    const kind = (p.type && p.type.specialized) || '';

    if (kind === 'group') {
      out.push(...flatten(p.properties, `${path}${p.key}.`, when));
      continue;
    }
    // Transparent: contributes a condition, never a path segment.
    if (kind === 'condition') {
      out.push(...flatten(p.properties, path, String(p.default || '')));
      continue;
    }
    if (!p.key) continue;

    out.push({
      name: p.name,
      path: path + p.key,
      primitive: (p.type && p.type.primitive) || 'string',
      specialized: kind,
      def: p.default,
      options: p.selectOptionsString ? p.selectOptionsString.split('\n').filter(Boolean) : null,
      description: (p.description || '').replace(/\s+/g, ' ').trim(),
      when,
    });
  }
  return out;
}

/* ── attribute bindings ────────────────────────────────────────────────── */

/** Collect `data-*` -> bound prop path from a component's block tree. */
function bindings(blocks, into = new Map()) {
  for (const b of blocks || []) {
    const attrs = (b.attrs && b.attrs.attributes) || {};
    for (const [attr, value] of Object.entries(attrs)) {
      if (typeof value !== 'string') continue;
      for (const m of value.matchAll(/props\.([A-Za-z0-9_.]+)/g)) {
        const p = m[1].replace(/\.(toLowerCase|toUpperCase|trim|includes)$/, '');
        if (!into.has(p)) into.set(p, attr);
      }
    }
    if (b.innerBlocks) bindings(b.innerBlocks, into);
  }
  return into;
}

/* ── render ────────────────────────────────────────────────────────────── */

// Pipes break the table, newlines break the row, and em dashes break the docs
// house style. Normalise on the way out rather than editing the components.
const esc = (s) =>
  String(s)
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/\s*—\s*/g, ', ');

function renderDefault(p) {
  // A `class` prop stores STYLE-ENTRY IDs, and those are minted per install. The
  // export's ids are the export's. Printing them would invite exactly the mistake
  // that printing component ids invites, so say what the field holds instead.
  if (p.specialized === 'class') return '*(install-local style ids)*';
  if (p.def === undefined || p.def === null || p.def === '') return '';
  const d = String(p.def);
  // Booleans arrive as "{true}" / "{false}"; strip the Etch brace wrapper.
  const m = d.match(/^\{(true|false)\}$/);
  return '`' + (m ? m[1] : d) + '`';
}

function renderValues(p) {
  if (p.options) return p.options.map((o) => '`' + o + '`').join(' / ');
  if (p.primitive === 'boolean') return '`true` / `false`';
  return p.description ? esc(p.description) : '';
}

/* ── schema fingerprint ────────────────────────────────────────────────── */

// One short hash per component over exactly what this table asserts: flattened
// path, default, and select options. An agent computes the same hashes live in
// ~360 bytes and compares, instead of pulling 36KB of schema into context.
//
// `class` props are excluded from the hash because they store install-local
// STYLE IDs. Including them makes every install mismatch, which would send every
// session to the full dump and make the whole mechanism pointless.
const fnv1a = (s) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
};

function fingerprint(props) {
  const rows = flatten(props).map((p) =>
    `${p.path}|${p.specialized === 'class' ? '<local>' : (p.def ?? '')}|${(p.options || []).join('\n')}`
  );
  return `${rows.length}:${fnv1a(rows.sort().join('\n'))}`;
}

const lines = [];
const report = { total: 0, bound: 0, unbound: [] };
const boundAttrs = new Set();

lines.push(
  `*Generated from Mega Menu Pro **${LABEL}**. Paths, defaults and select values are properties of`,
  `the plugin version, identical on every install of it. Component IDs are install-local and are`,
  `deliberately absent: always resolve them by name.*`,
  '',
  '#### Schema fingerprints — check these before trusting the tables below',
  '',
  'Run the fingerprint check in Section 3 (about 360 bytes returned) and compare per component.',
  'A match means this table describes the install exactly and you need no schema dump at all.',
  'A mismatch means the install differs from the version above: **dump only the components that',
  'disagree**, and treat the live schema as authoritative for those. Do not dump the ones that match.',
  '',
  '| Component | Fingerprint |',
  '| --- | --- |'
);
for (const comp of Object.values(doc.components)) {
  lines.push(`| ${esc(comp.name)} | \`${fingerprint(comp.properties)}\` |`);
}
lines.push('');

for (const comp of Object.values(doc.components)) {
  const props = flatten(comp.properties);
  const map = bindings(comp.blocks);
  report.total += props.length;

  lines.push(`### ${comp.name}`, '');
  lines.push('| Prop | Path | Attribute | Default | Values / notes |');
  lines.push('| --- | --- | --- | --- | --- |');

  for (const p of props) {
    const attr = map.get(p.path);
    if (attr) { report.bound++; boundAttrs.add(attr); } else { report.unbound.push(`${comp.name}: ${p.path}`); }
    const note = [renderValues(p), p.when ? 'Shown when `' + esc(p.when) + '`' : '']
      .filter(Boolean).join('. ');
    lines.push(
      `| ${esc(p.name)} | \`props.${p.path}\` | ${attr ? '`' + attr + '`' : 'style only'} | ${renderDefault(p)} | ${note} |`
    );
  }
  lines.push('');
}

/* ── coverage against the runtime contract ─────────────────────────────── */

let engineAttrs = [];
try {
  let src = readFileSync(ENGINE_PATH, 'utf8');
  // Strip comments first, so prose in the header block does not invent
  // attribute names that no code path ever reads.
  src = src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1');
  const names = new Set();
  for (const m of src.matchAll(/\b(?:attr|isOn|hasAttr|getAttribute|hasAttribute|closest|matches)\s*\(\s*['"]\[?data-([a-z0-9-]+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/['"]data-([a-z0-9-]+)['"]/g)) names.add(m[1]);
  engineAttrs = [...names].sort();
} catch {
  process.stderr.write(`(engine not read at ${ENGINE_PATH}; skipping attribute coverage)\n`);
}

const manual = engineAttrs.filter((a) => !boundAttrs.has(`data-${a}`));

process.stderr.write(
  `label: ${LABEL}\n` +
  `props: ${report.total}  bound to an attribute: ${report.bound}  style-only: ${report.unbound.length}\n` +
  `engine data-* names: ${engineAttrs.length}  covered by a prop: ${engineAttrs.length - manual.length}\n` +
  (manual.length ? `no prop writes these (${manual.length}): ${manual.join(', ')}\n` : '')
);

const output = lines.join('\n');

if (SPLICE_PATH) {
  const START = '<!-- GENERATED:PROPS start -->';
  const END = '<!-- GENERATED:PROPS end -->';
  const file = readFileSync(SPLICE_PATH, 'utf8');
  const a = file.indexOf(START);
  const b = file.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    process.stderr.write(`markers not found in ${SPLICE_PATH}; expected ${START} ... ${END}\n`);
    process.exit(1);
  }
  writeFileSync(SPLICE_PATH, file.slice(0, a + START.length) + '\n\n' + output + '\n' + file.slice(b), 'utf8');
  process.stderr.write(`spliced into ${SPLICE_PATH}\n`);
} else if (OUT_PATH) {
  writeFileSync(OUT_PATH, output, 'utf8');
  process.stderr.write(`wrote ${OUT_PATH}\n`);
} else {
  process.stdout.write(output);
}
