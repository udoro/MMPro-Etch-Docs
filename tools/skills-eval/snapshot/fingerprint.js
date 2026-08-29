// Cheap schema fingerprint. Flattens each component's props exactly as the
// generator does, then returns ONE short hash per component instead of the
// schema. Everything the prop table asserts is folded into the hash: path,
// default, and select options.
function flatten(props, path = '', out = []) {
  for (const p of props || []) {
    const k = (p.type && p.type.specialized) || '';
    if (k === 'group')     { flatten(p.properties, `${path}${p.key}.`, out); continue; }
    if (k === 'condition') { flatten(p.properties, path, out); continue; }
    if (!p.key) continue;
    // A `class` prop stores install-local STYLE IDs. Including its default makes
    // every install mismatch, which would send every session to the full dump.
    const def = k === 'class' ? '<local>' : (p.default ?? '');
    out.push(path + p.key + '|' + def + '|' + (p.selectOptionsString ?? ''));
  }
  return out;
}
// FNV-1a, 32-bit. Short, stable, no crypto needed for a change detector.
const hash = (s) => { let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36); };

const out = {};
for (const c of etch.components.list()) {
  if (!/^DWC /.test(c.name)) continue;
  const rows = flatten(c.properties ?? etch.components.getJson(c.id).properties);
  out[c.name] = rows.length + ':' + hash(rows.sort().join('\n'));
}
return JSON.stringify(out);
