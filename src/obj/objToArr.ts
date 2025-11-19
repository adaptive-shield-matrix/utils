export function objToArr<V, R>(o: { [s: string]: V }, mapper: (key: string, value: V) => R, init: R[] = []): R[] {
  const keys = Object.keys(o)
  for (const k of keys) {
    const v = o[k]
    if (v === undefined) continue
    const e = mapper(k, v)
    init.push(e)
  }
  return init
}
