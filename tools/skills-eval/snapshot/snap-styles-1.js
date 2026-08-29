const all = etch.styles.list();
const chunk = all.slice(200, 200 + 200);
return JSON.stringify({ total: all.length, offset: 200, count: chunk.length,
  entries: chunk.map(s => ({ id: s.id, selector: s.selector, type: s.type, collection: s.collection, css: s.css })) });
