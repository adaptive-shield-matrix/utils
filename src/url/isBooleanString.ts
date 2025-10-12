export function isBooleanString(s?: string | undefined | null) {
  if (!s) return false
  return s === "t" || s === "true" || s === "1"
}
