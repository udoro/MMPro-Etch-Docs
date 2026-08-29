const compId = (name) => etch.components.list().find(c => c.name === name)?.id;
const IDS = { HEADER: compId('DWC Header'), NAV: compId('DWC Nav'), TOGGLE: compId('DWC Mobile Toggle'), DROPDOWN: compId('DWC Dropdown'), ITEM: compId('DWC Menu Item') };
function findBlock(nodes, cid) {
  for (const n of nodes) { if (n.componentId === cid) return n; const f = findBlock(n.children || [], cid); if (f) return f; }
}
const tree = etch.blocks.getTree();
const header = findBlock(tree, IDS.HEADER);
const index = tree.findIndex(n => n.id === header.id);
return JSON.stringify({
  capturedAt: new Date().toISOString(),
  componentIds: IDS,
  header: { id: header.id, parentId: header.parentId, rootIndex: index },
  rootOrder: tree.map(n => ({ id: n.id, type: n.type, componentId: n.componentId })),
  copyPayload: etch.blocks.copy(header.id),
  fullTree: tree,
});
