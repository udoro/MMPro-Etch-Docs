const all = etch.styles.list();
const chunk = all.slice(600, 600 + 200);
return JSON.stringify({ total: all.length, offset: 600, count: chunk.length,
  entries: chunk.map(s => ({ id: s.id, selector: s.selector, type: s.type, collection: s.collection, css: s.css })) });
