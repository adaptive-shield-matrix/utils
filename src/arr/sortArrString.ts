export function sortArrString(l: Intl.LocalesArgument, array: string[]) {
  array.sort((a, b) => sortFn(l, a, b));
  return array;
}

function sortFn(l: Intl.LocalesArgument, a: string, b: string) {
  return a.toString().localeCompare(b.toString(), l, { numeric: true });
}
