// diff-state.mjs <before> <after> — what changed between two captures
import { readFileSync } from 'node:fs';
const [A, B] = process.argv.slice(2);
const rd = (d, f) => JSON.parse(readFileSync(`${d}/${f}`, 'utf8'));
const styles = (d) => { const m = new Map();
  for (const i of [0,1,2,3]) for (const e of rd(d, `styles-${i}.json`).entries) m.set(e.id, e);
  return m; };

const sa = styles(A), sb = styles(B);
const added   = [...sb.keys()].filter(k => !sa.has(k));
const removed = [...sa.keys()].filter(k => !sb.has(k));
const changed = [...sb.keys()].filter(k => sa.has(k) && sa.get(k).css !== sb.get(k).css);
const reselected = [...sb.keys()].filter(k => sa.has(k) && sa.get(k).selector !== sb.get(k).selector);

console.log(`STYLE ENTRIES  ${sa.size} -> ${sb.size}`);
console.log(`  added   ${added.length}: ${added.map(k=>sb.get(k).selector).slice(0,40).join(', ')}`);
console.log(`  removed ${removed.length}: ${removed.map(k=>sa.get(k).selector).slice(0,20).join(', ')}`);
console.log(`  css changed ${changed.length}: ${changed.map(k=>sb.get(k).selector).slice(0,20).join(', ')}`);
console.log(`  selector changed ${reselected.length}: ${reselected.map(k=>sa.get(k).selector+' -> '+sb.get(k).selector).slice(0,20).join(', ')}`);

const sha = rd(A,'sheets.json').sheets, shb = rd(B,'sheets.json').sheets;
console.log(`\nSTYLESHEETS`);
for (const s of shb) {
  const prev = sha.find(x => x.id === s.id);
  const d = !prev ? 'NEW' : prev.css === s.css ? 'unchanged' : `CHANGED ${prev.css.length} -> ${s.css.length} chars`;
  console.log(`  ${s.name} (${s.id}): ${d}`);
}

const ba = rd(A,'blocks.json'), bb = rd(B,'blocks.json');
console.log(`\nBLOCKS`);
console.log(`  header id ${ba.header.id} -> ${bb.header.id}`);
console.log(`  root children ${ba.rootOrder.length} -> ${bb.rootOrder.length}`);
console.log(`  tree size ${JSON.stringify(ba.fullTree).length} -> ${JSON.stringify(bb.fullTree).length} chars`);
