// Produce the same audit shape as audit.js, but from a captured blocks.json.
// Needed to establish what the site looked like BEFORE an arm ran, so that
// pre-existing conditions are not scored as that arm's drift.
//
// Usage: node audit-offline.mjs <capture-dir> > audit-<name>.json

import { readFileSync } from 'node:fs';

const dir = process.argv[2];
const cap = JSON.parse(readFileSync(`${dir}/blocks.json`, 'utf8'));
const NAME_BY_ID = new Map(Object.entries(cap.componentIds).map(([k, v]) => [v, k]));
const LABEL = { HEADER: 'DWC Header', NAV: 'DWC Nav', DROPDOWN: 'DWC Dropdown', ITEM: 'DWC Menu Item', TOGGLE: 'DWC Mobile Toggle' };

const comps = [], classed = [], usedStyleIds = new Set();
(function walk(nodes) {
  for (const n of nodes || []) {
    const attrs = n.attributes || {};
    if (Array.isArray(n.styles)) for (const s of n.styles) usedStyleIds.add(s);
    const cls = attrs.class;
    if (cls || (n.styles && n.styles.length)) {
      classed.push({
        id: n.id, type: n.type, tag: n.tag || null,
        component: LABEL[NAME_BY_ID.get(n.componentId)] || null,
        cls: cls ?? null,
        styleCount: Array.isArray(n.styles) ? n.styles.length : 0,
      });
    }
    const key = NAME_BY_ID.get(n.componentId);
    if (key) {
      const raw = {};
      for (const [k, v] of Object.entries(attrs)) if (typeof v === 'string' && v.startsWith('{')) raw[k] = v;
      comps.push({ id: n.id, component: LABEL[key], raw, plain: attrs });
    }
    walk(n.children);
  }
})(cap.fullTree);

const allStyles = [];
for (const i of [0, 1, 2, 3]) {
  for (const e of JSON.parse(readFileSync(`${dir}/styles-${i}.json`, 'utf8')).entries) {
    allStyles.push({ id: e.id, selector: e.selector, len: (e.css || '').length });
  }
}

process.stdout.write(JSON.stringify({
  liveComponentIds: Object.entries(cap.componentIds).map(([k, id]) => ({ id, name: LABEL[k] })),
  comps, classed, usedStyleIds: [...usedStyleIds], allStyles,
}));
