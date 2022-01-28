export function orderByText(list, attribute) {
  return list.sort((a, b) => a[attribute].localeCompare(b[attribute]));
}

export function orderByListFloat(list, attribute, order = "DESC") {
  const orderedList = list;

  if (order.toUpperCase() === "ASC") {
    orderedList.sort(function (a, b) {
      return parseFloat(a[attribute]) - parseFloat(b[attribute]);
    });
  }

  if (order.toUpperCase() === "DESC") {
    orderedList.sort(function (a, b) {
      return parseFloat(b[attribute]) - parseFloat(a[attribute]);
    });
  }

  return orderedList;
}
