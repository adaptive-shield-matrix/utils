export function safeParseInt(number: any, fallback: number) {
  const parsed = parseInt(number, 10)
  if (Number.isSafeInteger(parsed)) return parsed
  return fallback
}
