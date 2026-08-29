// Restore the site to the FINISHED Apple-nav build, not to the empty demo nav.
//
// The correction benchmark measures a small change to existing work, so both arms
// must start from the same completed build. This is the same shape as
// gen-restore2.mjs but its reference is `built-baseline` instead of the original
// snapshot, and it also reverts style entries the correction touched.
//
// Usage: node gen-restore-built.mjs <after-dir>

import { readFileSync, writeFileSync } from 'node:fs';

const rd = (d, f) => JSON.parse(readFileSync(`${d}/${f}`, 'utf8'));
const styles = (d) => {
  const m = new Map();
  for (const i of [0, 1, 2, 3]) for (const e of rd(d, `styles-${i}.json`).entries) m.set(e.id, e);
  return m;
};

const REF = 'built-baseline';
const after = process.argv[2];
if (!after) throw new Error('usage: node gen-restore-built.mjs <after-dir>');

const snap = rd(REF, 'blocks.json');
const sa = styles(REF), sb = styles(after);
const added = [...sb.keys()].filter((k) => !sa.has(k));
const changed = [...sb.keys()].filter((k) => sa.has(k) && sa.get(k).css !== sb.get(k).css);
// Entries the correction DELETED must come back, or the next arm starts short.
const removed = [...sa.keys()].filter((k) => !sb.has(k));

const js = `
const payload = ${JSON.stringify(snap.copyPayload)};
const addedStyles = ${JSON.stringify(added)};
const cssRestore = ${JSON.stringify(changed.map((id) => [id, sa.get(id).css]))};
const missing = ${JSON.stringify(removed.map((id) => ({ id, selector: sa.get(id).selector, css: sa.get(id).css })))};
const log = { errors: [], removedEntries: missing.map(m => m.selector) };

const compId = (n) => etch.components.list().find(c => c.name === n)?.id;
function findBlock(nodes, cid){ for (const n of nodes){ if(n.componentId===cid) return n; const f=findBlock(n.children||[],cid); if(f) return f; } }

const old = findBlock(etch.blocks.getTree(), compId('DWC Header'));
if (old) { etch.blocks.delete(old.id); log.deletedHeader = old.id; }

const newId = await etch.blocks.pasteAsync(payload, null, 0);
log.pastedHeader = newId;

log.stylesDeleted = 0;
for (const id of addedStyles) { try { etch.styles.delete(id); log.stylesDeleted++; } catch(e){ log.errors.push('style '+id+': '+e.message); } }

log.cssReverted = 0;
for (const [id, css] of cssRestore) { try { etch.styles.update(id, { css }); log.cssReverted++; } catch(e){ log.errors.push('css '+id+': '+e.message); } }

// Any stylesheet an arm created; the baseline has exactly three.
const KEEP = ["tuts", "Custom Media Definitions", "DWC Mega Menu"];
log.sheetsDeleted = [];
for (const s of etch.stylesheets.list()) {
  if (KEEP.includes(s.name)) continue;
  try { await etch.stylesheets.deleteAsync(s.id); log.sheetsDeleted.push(s.name); }
  catch(e){ log.errors.push('sheet '+s.name+': '+e.message); }
}

await etch.saveAsync();
return JSON.stringify(log);
`;

writeFileSync('restore-built.js', js);
console.log(`restore-built.js: ${(JSON.stringify(snap.copyPayload).length / 1024).toFixed(0)}KB payload, ` +
  `${added.length} to delete, ${changed.length} css reverts, ${removed.length} deleted-entry warnings`);
if (removed.length) console.log('  NOTE: the arm deleted entries that pasteAsync should restore:', removed.map((id) => sa.get(id).selector).join(', '));
