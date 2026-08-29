const all = etch.styles.list();
const chunk = all.slice(0, 0 + 200);
return JSON.stringify({ total: all.length, offset: 0, count: chunk.length,
  entries: chunk.map(s => ({ id: s.id, selector: s.selector, type: s.type, collection: s.collection, css: s.css })) });
