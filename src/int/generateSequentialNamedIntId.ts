const names: Record<string, number> = {}
export function generateSequentialNamedIntId(name = "default") {
  const n = names[name] ?? 0
  names[name] = n + 1
  return n
}
