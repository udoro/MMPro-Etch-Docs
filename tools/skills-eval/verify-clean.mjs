// Prove the cleaned export differs from the original ONLY by the removed keys.
//
// Compares the two documents structurally rather than textually: every node,
// every attribute, both directions. Anything that changed value, or any node that
// appeared or vanished, is a bug in the cleaner and is reported.

import { readFileSync } from 'node:fs';

const a = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const b = JSON.parse(readFileSync(process.argv[3], 'utf8'));

const flat = (doc) => {
  const out = new Map();
  (function walk(node, path) {
    if (node === null || typeof node !== 'object') { out.set(path, JSON.stringify(node)); return; }
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`)); return; }
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
  })(doc, '$');
  return out;
};

const fa = flat(a), fb = flat(b);
const onlyA = [...fa.keys()].filter((k) => !fb.has(k));
const onlyB = [...fb.keys()].filter((k) => !fa.has(k));
const changed = [...fb.keys()].filter((k) => fa.has(k) && fa.get(k) !== fb.get(k));

console.log(`leaf values: original ${fa.size}, cleaned ${fb.size}`);
console.log(`\nremoved outright (${onlyA.length}):`);
for (const k of onlyA.slice(0, 12)) console.log(`   ${k.replace(/\$\.gutenbergBlock/, '$')} = ${fa.get(k).slice(0, 40)}`);
if (onlyA.length > 12) console.log(`   ... and ${onlyA.length - 12} more`);

console.log(`\nADDED (must be 0): ${onlyB.length}`);
for (const k of onlyB.slice(0, 8)) console.log(`   ${k}`);

// Group blobs legitimately change as a string when a key is deleted from inside.
const groupEdits = changed.filter((k) => {
  const s = fa.get(k), t = fb.get(k);
  if (typeof s !== 'string' || !s.startsWith('"{')) return false;
  try {
    const o1 = JSON.parse(JSON.parse(s).slice(1, -1));
    const o2 = JSON.parse(JSON.parse(t).slice(1, -1));
    const gone = Object.keys(o1).filter((x) => !(x in o2));
    const added = Object.keys(o2).filter((x) => !(x in o1));
    const altered = Object.keys(o2).filter((x) => x in o1 && JSON.stringify(o1[x]) !== JSON.stringify(o2[x]));
    return gone.length > 0 && added.length === 0 && altered.length === 0;
  } catch { return false; }
});
const unexplained = changed.filter((k) => !groupEdits.includes(k));

console.log(`\ngroup blobs rewritten with keys removed only: ${groupEdits.length}`);
console.log(`UNEXPLAINED value changes (must be 0): ${unexplained.length}`);
for (const k of unexplained.slice(0, 8)) console.log(`   ${k}\n      was ${fa.get(k).slice(0, 60)}\n      now ${fb.get(k).slice(0, 60)}`);

const ok = onlyB.length === 0 && unexplained.length === 0;
console.log(`\n${ok ? 'CLEAN: only removals, nothing added or altered.' : 'PROBLEM: see above.'}`);
process.exit(ok ? 0 : 1);
