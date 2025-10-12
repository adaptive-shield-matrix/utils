export function emptyStringAsNull(s: string | null | undefined): string | null {
  if (!s) return null
  return s
}
