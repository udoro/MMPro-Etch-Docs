// Strip legacy stored values from the demo content inside a component export.
//
// The values live in $.gutenbergBlock, which is what a user actually receives and
// pastes in. Each block names its component through `attrs.ref` (a component id),
// so "legacy" can be decided precisely instead of by key name: a stored path is
// legacy when the component that block refers to does not declare it.
//
// Two shapes:
//   FLAT   attrs.attributes.<key>              -> delete the key
//   GROUP  attrs.attributes.<group> = '{...}'  -> rewrite without the key
//
// KEEP is honoured exactly.
//
// Usage: node zz-clean-export.mjs <in.json> [--write <out.json>]

import { readFileSync, writeFileSync } from 'node:fs';

const IN = process.argv[2];
const OUT = process.argv.includes('--write') ? process.argv[process.argv.indexOf('--write') + 1] : null;
const doc = JSON.parse(readFileSync(IN, 'utf8'));

// Nothing is kept: mobile.submenuSlideExtras is a stored shape the component no
// longer declares, and the cleaned demo renders correctly without the others.
const KEEP = [];
const SKIP_ATTRS = ['class', 'id', 'style'];

// Declared paths and group names, keyed by component id.
const byRef = new Map();
for (const c of Object.values(doc.components || {})) {
  const paths = new Set(), grp = new Set();
  (function walk(ps, path = '') {
    for (const p of ps || []) {
      const k = (p.type && p.type.specialized) || '';
      // Record the group at its FULL path, not just its bare key. A group nested
      // inside another group (mobile.submenuSlideExtras) matches neither the leaf
      // set nor a top-level-only name set, and was wrongly reported as legacy.
      if (k === 'group') { grp.add(path + p.key); walk(p.properties, `${path}${p.key}.`); continue; }
      if (k === 'condition') { walk(p.properties, path); continue; }
      if (!p.key) continue;
      paths.add(path + p.key);
    }
  })(c.properties);
  byRef.set(c.id, { name: c.name, paths, grp });
}

const removed = [];
const kept = [];

(function walk(node, ref) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const n of node) walk(n, ref); return; }

  // Only a block carrying its own attrs.ref IS a component instance. Inheriting
  // it downward makes every nested svg/path/a inside a Dropdown look like a
  // Dropdown, and their real HTML attributes (d, viewBox, href) get judged
  // against component props they were never meant to match.
  const ownRef = node.attrs && node.attrs.ref;
  const comp = ownRef !== undefined ? byRef.get(ownRef) : undefined;
  const myRef = ownRef !== undefined ? ownRef : ref;
  const attrs = node.attrs && node.attrs.attributes;

  if (comp && attrs && typeof attrs === 'object') {
    for (const [key, val] of Object.entries({ ...attrs })) {
      if (SKIP_ATTRS.includes(key)) continue;

      if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
        let obj; try { obj = JSON.parse(val.slice(1, -1)); } catch { obj = null; }
        if (obj && typeof obj === 'object') {
          let touched = false;
          for (const k of Object.keys(obj)) {
            const full = `${key}.${k}`;
            if (comp.paths.has(full) || comp.grp.has(full)) continue;
            if (KEEP.includes(full)) { kept.push(`${comp.name}  ${full}`); continue; }
            removed.push(`${comp.name}  ${full} = ${JSON.stringify(obj[k]).slice(0, 44)}`);
            delete obj[k];
            touched = true;
          }
          if (touched) attrs[key] = '{' + JSON.stringify(obj) + '}';
          continue;
        }
      }

      if (comp.paths.has(key) || comp.grp.has(key)) continue;
      removed.push(`${comp.name}  ${key} = ${JSON.stringify(val).slice(0, 44)}`);
      delete attrs[key];
    }
  }

  for (const v of Object.values(node)) walk(v, myRef);
})(doc.gutenbergBlock, undefined);

console.log(`legacy values removed: ${removed.length}`);
for (const r of removed.sort()) console.log(`   ${r}`);
if (kept.length) { console.log(`\nkept by rule (${kept.length}):`); for (const k of kept) console.log(`   ${k}`); }

if (OUT) { // Match the source formatting exactly. The original is minified; pretty-printing
  // it would double the file size and make every line differ in a diff.
  writeFileSync(OUT, JSON.stringify(doc)); console.log(`\nwrote ${OUT}`); }
else console.log('\n(dry run — pass --write <out.json> to save)');
