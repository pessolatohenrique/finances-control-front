export function groupByAttribute(arr, prop) {
  const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
  arr.forEach((obj) => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
}

export function ungroupItems(list) {
  const listCopy = list.slice();
  let listUnique = [];
  listCopy.map((item) => {
    item.map((sub) => {
      listUnique.push(sub);
      return sub;
    });

    return item;
  });

  return listUnique;
}
