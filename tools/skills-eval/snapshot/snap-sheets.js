return JSON.stringify({ sheets: etch.stylesheets.list().map(s => ({ id: s.id, name: s.name, type: s.type, css: s.css })) });
