export function intRange(length: number, startInclusive: number = 0): number[] {
  return Array.from({ length: length }, (v, k) => startInclusive + k)
}
