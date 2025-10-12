export function randomInteger(maxExclusive: number, minInclusive = 0): number {
  return minInclusive + Math.floor(Math.random() * (maxExclusive - minInclusive))
}
