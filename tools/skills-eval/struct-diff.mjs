// Compare two captures by STRUCTURE, not by block id.
//
// A paste-based restore re-mints every block id, so an id-keyed diff reports
// "198 added, 198 removed" and tells you nothing. This walks both trees in
// document order and compares what actually has to match.

import { readFileSync } from 'node:fs';

const load = (d) => JSON.parse(readFileSync(`${d}/blocks.json`, 'utf8')).fullTree;
const [A, B] = [process.argv[2], process.argv[3]].map(load);

/** Document-order walk yielding a comparable signature per node. */
function walk(nodes, path = '', out = []) {
  (nodes || []).forEach((n, i) => {
    const here = `${path}/${i}:${n.type}`;
    out.push({
      path: here,
      type: n.type,
      tag: n.tag ?? null,
      componentId: n.componentId ?? null,
      slotName: n.slotName ?? null,
      cls: (n.attributes && n.attributes.class) ?? null,
      styles: Array.isArray(n.styles) ? n.styles.length : 0,
      // Group attributes are the configuration; compare them verbatim.
      attrs: JSON.stringify(n.attributes ?? {}),
      text: n.type === 'etch/text' ? String(n.content ?? '').trim().slice(0, 80) : null,
    });
    walk(n.children, here, out);
  });
  return out;
}

const a = walk(A), b = walk(B);
console.log(`nodes: ${a.length} vs ${b.length}`);

let mismatches = 0;
const n = Math.max(a.length, b.length);
for (let i = 0; i < n; i++) {
  const x = a[i], y = b[i];
  if (!x || !y) {
    console.log(`  [${i}] present in only one tree: ${(x || y).path}`);
    mismatches++;
    continue;
  }
  for (const k of ['type', 'tag', 'componentId', 'slotName', 'cls', 'styles', 'attrs', 'text']) {
    if (JSON.stringify(x[k]) !== JSON.stringify(y[k])) {
      mismatches++;
      console.log(`  [${i}] ${y.path} .${k}`);
      console.log(`      was: ${String(x[k]).slice(0, 150)}`);
      console.log(`      now: ${String(y[k]).slice(0, 150)}`);
    }
  }
}

console.log(mismatches === 0
  ? `\nSTRUCTURALLY IDENTICAL across all ${a.length} nodes.`
  : `\n${mismatches} structural difference(s).`);
process.exit(mismatches === 0 ? 0 : 1);
