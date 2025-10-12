export function searchParamsToObject(searchParams: string): Record<string, string> {
  const result: Record<string, string> = {}
  const params = new URLSearchParams(searchParams)
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  return result
}
