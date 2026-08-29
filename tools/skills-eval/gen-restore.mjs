// Generate an in-page script that returns the site to a snapshot.
//
// copy()/pasteAsync() re-maps block ids but REUSES style-entry ids, so a
// paste-only restore leaves every entry the run created sitting in the list for
// the next arm to find. The snapshot therefore has to cover styles, not just
// blocks, and the generated script deletes what was added and reverts what was
// changed.
//
// Usage: node gen-restore.mjs <after-dir> [snapshot-dir]
//   defaults: snapshot-dir = "baseline"
//   writes restore.js; run it with:  node etch.mjs restore.js

import { readFileSync, writeFileSync } from 'node:fs';

const AFTER = process.argv[2];
const REF = process.argv[3] || 'baseline';
if (!AFTER) {
  console.error('usage: node gen-restore.mjs <after-dir> [snapshot-dir]');
  process.exit(1);
}

const rd = (d, f) => JSON.parse(readFileSync(`${d}/${f}`, 'utf8'));
const styles = (d) => {
  const m = new Map();
  for (const i of [0, 1, 2, 3]) for (const e of rd(d, `styles-${i}.json`).entries) m.set(e.id, e);
  return m;
};

const snap = rd(REF, 'blocks.json');
const sa = styles(REF), sb = styles(AFTER);

const added = [...sb.keys()].filter((k) => !sa.has(k));
const changed = [...sb.keys()].filter((k) => sa.has(k) && sa.get(k).css !== sb.get(k).css);
// Entries the run DELETED come back with the pasted subtree, but any that were
// referenced elsewhere would not; report them rather than silently losing them.
const removed = [...sa.keys()].filter((k) => !sb.has(k));

// Stylesheets present in the snapshot are the ones to keep; anything else was
// created by the run.
const keepSheets = rd(REF, 'sheets.json').sheets.map((s) => s.name);

const js = `
const payload = ${JSON.stringify(snap.copyPayload)};
const addedStyles = ${JSON.stringify(added)};
const cssRestore = ${JSON.stringify(changed.map((id) => [id, sa.get(id).css]))};
const KEEP_SHEETS = ${JSON.stringify(keepSheets)};
const log = { errors: [] };

const compId = (n) => etch.components.list().find(c => c.name === n)?.id;
function findBlock(nodes, cid) {
  for (const n of nodes) { if (n.componentId === cid) return n; const f = findBlock(n.children || [], cid); if (f) return f; }
}

const old = findBlock(etch.blocks.getTree(), compId('DWC Header'));
if (old) { etch.blocks.delete(old.id); log.deletedHeader = old.id; }

log.pastedHeader = await etch.blocks.pasteAsync(payload, null, 0);

log.stylesDeleted = 0;
for (const id of addedStyles) {
  try { etch.styles.delete(id); log.stylesDeleted++; }
  catch (e) { log.errors.push('style ' + id + ': ' + e.message); }
}

log.cssReverted = 0;
for (const [id, css] of cssRestore) {
  try { etch.styles.update(id, { css }); log.cssReverted++; }
  catch (e) { log.errors.push('css ' + id + ': ' + e.message); }
}

log.sheetsDeleted = [];
for (const s of etch.stylesheets.list()) {
  if (KEEP_SHEETS.includes(s.name)) continue;
  try { await etch.stylesheets.deleteAsync(s.id); log.sheetsDeleted.push(s.name); }
  catch (e) { log.errors.push('sheet ' + s.name + ': ' + e.message); }
}

await etch.saveAsync();
return JSON.stringify(log);
`;

writeFileSync('restore.js', js);
console.log(
  `restore.js: ${(JSON.stringify(snap.copyPayload).length / 1024).toFixed(0)}KB payload, ` +
  `${added.length} entries to delete, ${changed.length} css reverts, ` +
  `${keepSheets.length} stylesheets kept`
);
if (removed.length) {
  console.log(`  NOTE: the run deleted ${removed.length} pre-existing entries; ` +
    `pasteAsync restores those inside the header, but check anything referenced elsewhere.`);
}
