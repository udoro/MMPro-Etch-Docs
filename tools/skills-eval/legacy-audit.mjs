// Which stored values on the live blocks are no longer declared by the components?
//
// Two separate problems get conflated here, so they are reported separately:
//   ORPHAN  a key inside a group that the component no longer declares
//   FLAT    a key at the top level that duplicates a grouped prop of the same name
//
// Neither can be written with setAttribute (it rejects unknown keys), so both are
// dead weight in the attribute store. Removing them is a data cleanup, not a
// config change.

import { readFileSync } from 'node:fs';

const EXPORT = process.argv[2];
const AUDIT = process.argv[3];
const doc = JSON.parse(readFileSync(EXPORT, 'utf8'));
const live = JSON.parse(readFileSync(AUDIT, 'utf8'));

// Declared paths per component, plus the set of top-level group names.
const declared = new Map();
const groups = new Map();
for (const c of Object.values(doc.components)) {
  const paths = new Set();
  const grp = new Set();
  (function walk(ps, path = '') {
    for (const p of ps || []) {
      const k = (p.type && p.type.specialized) || '';
      if (k === 'group') { grp.add(p.key); walk(p.properties, `${path}${p.key}.`); continue; }
      if (k === 'condition') { walk(p.properties, path); continue; }
      if (!p.key) continue;
      paths.add(path + p.key);
    }
  })(c.properties);
  declared.set(c.name, paths);
  groups.set(c.name, grp);
}

const orphans = new Map();  // "Component group.key" -> value
const flats = new Map();    // "Component key" -> value

for (const c of live.comps) {
  const paths = declared.get(c.component);
  const grp = groups.get(c.component);
  if (!paths) continue;

  for (const [key, raw] of Object.entries(c.raw)) {
    let obj; try { obj = JSON.parse(raw.slice(1, -1)); } catch { continue; }
    for (const k of Object.keys(obj || {})) {
      const full = `${key}.${k}`;
      if (!paths.has(full)) orphans.set(`${c.component}  ${full}`, JSON.stringify(obj[k]));
    }
  }
  for (const [k, v] of Object.entries(c.plain)) {
    if (typeof v === 'string' && v.startsWith('{')) continue;   // a group blob
    if (k === 'class' || k === 'id' || k === 'style') continue; // ordinary HTML attrs
    if (paths.has(k)) continue;                                 // legitimately top-level
    if (grp.has(k)) continue;                                   // the group itself
    flats.set(`${c.component}  ${k}`, JSON.stringify(v).slice(0, 60));
  }
}

const show = (title, m, note) => {
  console.log(`\n${title} (${m.size})`);
  if (!m.size) { console.log('  none'); return; }
  console.log(`  ${note}`);
  for (const [k, v] of [...m].sort()) console.log(`   ${k.padEnd(44)} = ${v}`);
};

show('ORPHANED GROUP KEYS', orphans, 'inside a group, no longer declared by the component');
show('STALE FLAT KEYS', flats, 'top level, duplicating a grouped prop of the same name');
console.log(`\ntotal to remove: ${orphans.size + flats.size}`);
