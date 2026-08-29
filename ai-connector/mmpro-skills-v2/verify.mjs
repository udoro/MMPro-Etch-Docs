import { readFileSync } from 'node:fs';
const coreV2 = readFileSync('mmpro-skills-v2/mega-menu-pro-skills.md','utf8');
const refV2  = readFileSync('mmpro-skills-v2/mega-menu-pro-skills-reference.md','utf8');
const orig   = readFileSync('mmpro-skills/mega-menu-pro-skills.md','utf8');
const all = coreV2 + '\n' + refV2;
let fail = 0;
const ok = (c, msg) => { console.log((c?'  ok   ':'  FAIL ') + msg); if(!c) fail++; };

// 1. INV ids: every id cited must be defined on the card
const defined = new Set([...coreV2.matchAll(/\*\*(INV-\d+)\*\*/g)].map(m=>m[1]));
const cited   = new Set([...all.matchAll(/\b(INV-\d+)\b/g)].map(m=>m[1]));
const undef   = [...cited].filter(i=>!defined.has(i)).sort();
const unused  = [...defined].filter(i=>![...all.matchAll(/\bINV-\d+\b/g)].filter(m=>m[0]===i).length>1);
console.log(`\nINV: ${defined.size} defined, ${cited.size} distinct cited`);
ok(undef.length===0, `every cited INV is defined${undef.length?': missing '+undef.join(','):''}`);

// 2. token coverage vs original
const pats=[/\b[a-z]+[A-Z][A-Za-z]*\.[a-zA-Z]+[A-Za-z]*/g,/\betch\.[a-z]+\.[a-zA-Z]+/g,/--[a-z][a-z0-9-]{3,}/g,/\.dwc[a-z-]*[a-z]/g,/data-[a-z-]{3,}/g,/\b[A-Z][a-z]+_[A-Za-z_]+\b/g];
const toks=new Set(); for(const p of pats) for(const m of orig.matchAll(p)) toks.add(m[0]);
// Tokens v2 drops ON PURPOSE. Ref 4 is now generated from the component export,
// so the mandatory live schema dump is gone and its snippet goes with it. Every
// entry here needs a reason, or the check stops being a check.
const DROPPED=new Set(['componentJson.properties']);
const missTok=[...toks].filter(t=>!all.includes(t)&&!DROPPED.has(t));
console.log(`\nCoverage: ${toks.size} technical tokens in original, ${DROPPED.size} dropped by design`);
ok(missTok.length===0, `all survive in v2${missTok.length?': lost '+missTok.slice(0,8).join(', '):''}`);

// 3. stale intra-file section refs in the core
// Sections 2, 3 and 6 live in the core now; only 4, 5, 7, 8 and Appendix A are in the reference.
const RE_MOVED=/Section [4578]|Appendix A/;
const CL = coreV2.split('\n');
// A cross-reference often names the reference file on an adjacent line, so check a window.
const staleCtx = [...CL.entries()].filter(([i,l]) =>
  RE_MOVED.test(l) && !/reference/i.test(CL.slice(Math.max(0,i-2), i+3).join(' ')));
console.log(`\nCross-references:`);
ok(staleCtx.length===0, `no core ref points at a moved section without naming the reference file${staleCtx.length?' ('+staleCtx.length+' left)':''}`);
for(const [i,l] of staleCtx) console.log('      line',i+1,'>',l.trim().slice(0,110));

// 4. component links resolve at this depth
const links=[...all.matchAll(/\.\.\/\.\.\/components\/[a-z-]+\.md/g)].map(m=>m[0]);
console.log(`\nLinks: ${links.length} ../../components/ references`);
ok(links.length>0,'component links present and at the same depth as v1');

// 5. getGroup guard
console.log(`\nHelpers:`);
ok(coreV2.includes('return raw ? JSON.parse(raw.slice(1, -1)) : {};'),'core getGroup is the guarded version');
ok(!coreV2.includes('return JSON.parse(etch.blocks.getAttribute(bid, key).slice(1, -1));'),'unguarded getGroup is gone from the core');

// 6. duplication removed
console.log(`\nDeduplication:`);
const count=(h,n)=>h.split(n).length-1;
ok(count(coreV2,'inspect-schema.js')<count(orig,'inspect-schema.js'),`inspect-schema.js block no longer duplicated (${count(orig,'inspect-schema.js')} -> ${count(coreV2,'inspect-schema.js')})`);
// The live-schema declaration belonged to the full dump, which Ref 4 replaced.
// It must be gone entirely, not merely deduplicated: leaving one copy would have
// agents dumping the schema AND reading the table.
ok(count(coreV2,'I have read the live schema for ID')===0,'live-schema declaration fully removed');
ok(coreV2.includes('<!-- no marker -->')===false&&refV2.includes('<!-- GENERATED:PROPS start -->'),'generated prop table present in the reference');
ok(/Generated from Mega Menu Pro \*\*\d+\.\d+/.test(refV2),'generated table carries a version stamp');
ok(/componentId \d/.test(coreV2+refV2)===false,'no install-local component ids anywhere');

console.log(fail? `\n${fail} check(s) failed` : '\nall checks passed');
process.exit(fail?1:0);
