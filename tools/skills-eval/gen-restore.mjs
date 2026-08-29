import { readFileSync, writeFileSync } from 'node:fs';
const rd=(d,f)=>JSON.parse(readFileSync(`${d}/${f}`,'utf8'));
const styles=(d)=>{const m=new Map();for(const i of[0,1,2,3])for(const e of rd(d,`styles-${i}.json`).entries)m.set(e.id,e);return m;};
const snap=rd('test-snapshot','blocks.json');
const sa=styles('test-snapshot'), sb=styles(process.argv[2] || 'test-after-b');
const added=[...sb.keys()].filter(k=>!sa.has(k));
const changed=[...sb.keys()].filter(k=>sa.has(k)&&sa.get(k).css!==sb.get(k).css);
const tuts=rd('test-snapshot','sheets.json').sheets.find(s=>s.id==='5378835');

const js = `
const payload = ${JSON.stringify(snap.copyPayload)};
const addedStyles = ${JSON.stringify(added)};
const cssRestore = ${JSON.stringify(changed.map(id=>[id, sa.get(id).css]))};
const tutsCss = ${JSON.stringify(tuts.css)};
const log = { errors: [] };

const compId = (n) => etch.components.list().find(c => c.name === n)?.id;
function findBlock(nodes, cid){ for (const n of nodes){ if(n.componentId===cid) return n; const f=findBlock(n.children||[],cid); if(f) return f; } }

// 1. remove the rebuilt header
const old = findBlock(etch.blocks.getTree(), compId('DWC Header'));
if (old) { etch.blocks.delete(old.id); log.deletedHeader = old.id; }

// 2. paste the snapshot header back at document root, first position
const newId = await etch.blocks.pasteAsync(payload, null, 0);
log.pastedHeader = newId;

// 3. drop style entries this build created
log.stylesDeleted = 0;
for (const id of addedStyles) { try { etch.styles.delete(id); log.stylesDeleted++; } catch(e){ log.errors.push('style '+id+': '+e.message); } }

// 4. revert CSS on entries it modified
log.cssReverted = 0;
for (const [id, css] of cssRestore) { try { etch.styles.update(id, { css }); log.cssReverted++; } catch(e){ log.errors.push('css '+id+': '+e.message); } }

await etch.saveAsync();

// 5. remove any stylesheets an arm created; the baseline has exactly three
const KEEP = ["tuts", "Custom Media Definitions", "DWC Mega Menu"];
log.sheetsDeleted = [];
for (const s of etch.stylesheets.list()) {
  if (KEEP.includes(s.name)) continue;
  try { await etch.stylesheets.deleteAsync(s.id); log.sheetsDeleted.push(s.name); }
  catch(e){ log.errors.push("sheet "+s.name+": "+e.message); }
}

// 6. tuts stylesheet persists immediately and is a separate namespace
try { await etch.stylesheets.updateAsync('5378835', { css: tutsCss }); log.tutsReverted = true; }
catch(e){ log.tutsReverted = false; log.errors.push('tuts: '+e.message); }

return JSON.stringify(log);
`;
writeFileSync('restore2.js', js);
console.log(`restore2.js: paste payload ${(JSON.stringify(snap.copyPayload).length/1024).toFixed(0)}KB, ${added.length} styles to delete, ${changed.length} css reverts`);
