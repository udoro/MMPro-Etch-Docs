// Differential drift grading: score an arm against the BASELINE, not against an
// absolute ideal.
//
// Why: graded absolutely, the untouched baseline itself "fails" D3, D7, D8 and D9.
// Etch serialises a component's whole group including defaults, the site ships
// style entries this page does not reference, and the original nav already used a
// local trigger-mode override. Those are properties of the install. Only a
// difference an arm introduced is that arm's drift.
//
// Usage: node grade-diff.mjs audit-baseline.json audit-<arm>.json

import { readFileSync } from 'node:fs';

const EXPORT = '';
const doc = JSON.parse(readFileSync(EXPORT, 'utf8'));

function flatten(props, path = '', out = new Map()) {
  for (const p of props || []) {
    const kind = (p.type && p.type.specialized) || '';
    if (kind === 'group')     { flatten(p.properties, `${path}${p.key}.`, out); continue; }
    if (kind === 'condition') { flatten(p.properties, path, out); continue; }
    if (!p.key) continue;
    out.set(path + p.key, {
      def: p.default === undefined || p.default === null ? '' : String(p.default),
      options: p.selectOptionsString ? p.selectOptionsString.split('\n').filter(Boolean) : null,
      specialized: kind,
    });
  }
  return out;
}
const META = new Map();
for (const c of Object.values(doc.components)) META.set(c.name, flatten(c.properties));

const load = (f) => JSON.parse(readFileSync(f, 'utf8'));
const [base, arm] = [load(process.argv[2]), load(process.argv[3])];

/** Every written (component, path, value) in a capture. */
function written(a) {
  const rows = [];
  for (const c of a.comps) {
    const meta = META.get(c.component);
    if (!meta) continue;
    for (const [key, raw] of Object.entries(c.raw)) {
      let obj; try { obj = JSON.parse(raw.slice(1, -1)); } catch { continue; }
      for (const [k, v] of Object.entries(obj || {})) rows.push({ comp: c.component, id: c.id, path: `${key}.${k}`, val: v, raw });
    }
    for (const [k, v] of Object.entries(c.plain)) {
      if (typeof v === 'string' && v.startsWith('{')) continue;
      if (meta.has(k)) rows.push({ comp: c.component, id: c.id, path: k, val: v, raw: null });
    }
  }
  return rows;
}

const wb = written(base), wa = written(arm);
const norm = (s) => String(s).replace(/^\{(true|false)\}$/, '$1');
const R = [];
const add = (id, ok, desc, hits = []) => R.push({ id, ok, desc, hits });

/* D1 — select stored as a UI label. Absolute: any occurrence is a defect. */
const d1 = [];
for (const r of wa) {
  const m = META.get(r.comp)?.get(r.path);
  if (!m?.options) continue;
  const pairs = m.options.map((o) => { const i = o.indexOf(' : '); return i === -1 ? { l: o, v: o } : { l: o.slice(0, i), v: o.slice(i + 3) }; });
  const sv = String(r.val);
  if (!pairs.some((p) => p.v === sv) && pairs.some((p) => p.l === sv && p.v !== sv))
    d1.push(`${r.comp} ${r.path} = "${sv}" should be "${pairs.find((p) => p.l === sv).v}"`);
}
add('D1', d1.length === 0, 'select values stored as values, not UI labels', d1);

/* D2 — brace depth. Absolute. */
const d2 = [];
for (const c of arm.comps) for (const [k, raw] of Object.entries(c.raw)) if (raw.startsWith('{{{')) d2.push(`${c.component} .${k}`);
add('D2', d2.length === 0, 'group attributes single-brace encoded', d2);

/* D3 — class xor styles, counted as a DELTA. */
const xor = (a) => a.classed.filter((n) => (n.cls && n.styleCount === 0) || (!n.cls && n.styleCount > 0));
const xb = xor(base), xa = xor(arm);
add('D3', xa.length <= xb.length, `class/styles mismatches: baseline ${xb.length} -> arm ${xa.length}`,
  xa.length > xb.length ? xa.map((n) => `${n.id} (${n.tag || n.type}) cls=${n.cls} styles=${n.styleCount}`) : []);

/* D7 — props at default, as a DELTA of distinct (component, path) pairs. */
const atDefault = (rows) => {
  const s = new Set();
  for (const r of rows) {
    const m = META.get(r.comp)?.get(r.path);
    if (!m || m.specialized === 'class' || m.def === '') continue;
    if (norm(String(r.val)) === norm(m.def)) s.add(`${r.comp} ${r.path}`);
  }
  return s;
};
const db = atDefault(wb), da = atDefault(wa);
// Writing the default is only pointless when the block did not already hold a
// NON-default value. Turning an inherited `lastItemIsButton: true` back to
// `false` is a deliberate correction, not a redundant write.
const baseVal = new Map(wb.map((r) => [`${r.comp} ${r.path}`, norm(String(r.val))]));
const newDefaults = [...da].filter((k) => {
  if (db.has(k)) return false;                 // already at default before: unchanged
  const prev = baseVal.get(k);
  if (prev === undefined) return true;         // genuinely new and redundant
  // Component names contain spaces ("DWC Nav"), so split on the LAST one.
  const i = k.lastIndexOf(' ');
  const m = META.get(k.slice(0, i))?.get(k.slice(i + 1));
  return m ? prev === norm(m.def) : true;      // was non-default: this is an override
});
add('D7', newDefaults.length === 0, `props at their default: baseline ${db.size} -> arm ${da.size} (${newDefaults.length} new)`, newDefaults);

/* D8 — local override where a global exists, as a DELTA. */
const locals = (a) => a.comps.filter((c) => c.component === 'DWC Dropdown' && c.plain.dropdownTriggerMode !== undefined).length;
const totalDropdowns = (a) => a.comps.filter((c) => c.component === 'DWC Dropdown').length;
const lb = locals(base), la = locals(arm);
// D8 no longer treats a per-item trigger override as suspicious. DWC Dropdown's
// dropdownTriggerMode has no inherit option, so the Nav-level global never applies
// and the per-item value is the only one that works. Reported for visibility only.
add('D8', true, `per-item dropdownTriggerMode: baseline ${lb}/${totalDropdowns(base)} -> arm ${la}/${totalDropdowns(arm)} dropdowns (informational: the Nav global for this prop is inert)`);

/* D9 — orphaned entries, as a DELTA. */
const orphans = (a) => { const u = new Set(a.usedStyleIds); return a.allStyles.filter((s) => !u.has(s.id)).length; };
// Only entries the arm CREATED can be its own orphans. Entries stranded by
// deleting the previous nav are a consequence of the approved rebuild, and this
// measure sees one page, so it cannot tell "stranded" from "used elsewhere".
const baseIds = new Set(base.allStyles.map((s) => s.id));
const usedA = new Set(arm.usedStyleIds);
const createdEntries = arm.allStyles.filter((s) => !baseIds.has(s.id));
const selfOrphans = createdEntries.filter((s) => !usedA.has(s.id));
const stranded = [...new Set(base.usedStyleIds)].filter((id) => !usedA.has(id));
add('D9', selfOrphans.length === 0,
  `entries created ${createdEntries.length}, of which unreferenced ${selfOrphans.length}` +
  ` (separately, ${stranded.length} pre-existing entries were stranded by the rebuild)`,
  selfOrphans.map((s) => s.selector));

/* ── report ────────────────────────────────────────────────────────────── */
console.log(`\n=== ${process.argv[3]} vs baseline ===\n`);
for (const r of R) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.id}  ${r.desc}`);
  for (const h of r.hits.slice(0, 8)) console.log(`         - ${h}`);
  if (r.hits.length > 8) console.log(`         ... and ${r.hits.length - 8} more`);
}
const failed = R.filter((r) => !r.ok);
console.log(`\n${failed.length === 0 ? 'All automated signals pass.' : failed.length + ' signal(s) failed: ' + failed.map((r) => r.id).join(', ')}`);
console.log('D5, D6, D10, D11 are graded separately (stylesheets and the agent report).');
