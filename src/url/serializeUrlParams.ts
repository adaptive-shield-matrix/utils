export function serializeUrlParams(obj: Record<string, string>) {
  const params = new URLSearchParams(obj)
  return params.toString()
}
