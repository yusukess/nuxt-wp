export function buildMenuTree(items) {
  const map = new Map();

  items.forEach((item) => map.set(item.id, { ...item, children: [] }));

  const tree = [];
  items.forEach((item) => {
    if (item.parent) {
      map.get(item.parent).children.push(map.get(item.id));
    } else {
      tree.push(map.get(item.id));
    }
  });

  return tree;
}
