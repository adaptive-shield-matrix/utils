export function numRound0(n: number): number {
  return Math.round(n)
}
export function numRound1(n: number): number {
  return Math.round(n * 10) / 10
}
export function numRound2(n: number): number {
  return Math.round(n * 100) / 100
}
export function numRound3(n: number): number {
  return Math.round(n * 1_000) / 1_000
}
export function numRound4(n: number): number {
  return Math.round(n * 10_000) / 10_000
}

export function numRound1R(n: number): number {
  return Math.round(n / 10) * 10
}
export function numRound2R(n: number): number {
  return Math.round(n / 100) * 100
}
export function numRound3R(n: number): number {
  return Math.round(n / 1_000) * 1_000
}
export function numRound4R(n: number): number {
  return Math.round(n / 10_000) * 10_000
}
