export function capitalizeFirstLetter(s: string) {
  if (!s) return s
  if (s.length <= 2) return s
  return s[0]!.toUpperCase() + s.substring(1)
}
