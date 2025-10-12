export const MAX_INT32 = 2147483647
export const BASE32_STRING_ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"

export type PseudoRandom = {
  seed: number
  float(): number
  float(max: number): number
  float(min: number, max: number): number
  int(): number
  int(maxExclusive: number): number
  int(minInclusive: number, maxExclusive: number): number
  bool(): boolean
  bool(chance: number): boolean
  arr<A>(array: A[] | Readonly<A[]>): A
  char(): string
  char(chars: string): string
  string(): string
  string(length: number): string
  string(length: number, encoding: string): string
  skip(): void
  skip(iterations: number): void
}

export function createPseudoRandomSec() {
  const t = Math.round(new Date().getTime() / 10_000)
  return createPseudoRandom(t)
}

export function createPseudoRandom(seed: number = new Date().getTime()): PseudoRandom {
  /**
   * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
   * https://github.com/bryc/code/blob/master/jshash/PRNGs.md
   */
  function mulberry32() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    // seed = (seed + 0x6d2b79f5)
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  function float(a1?: number, a2?: number) {
    if (a2) {
      const min = a1 ?? 0
      const max = a2 ?? 1
      return min + (max - min) * mulberry32()
    }
    const min = 0
    const max = a1 ?? 1
    return min + (max - min) * mulberry32()
  }
  function int(a1: number = MAX_INT32, a2?: number) {
    if (a2) {
      const min = a1
      const max = a2
      return min + Math.floor(mulberry32() * (max - min))
    }
    const min = 0
    const max = a1
    return min + Math.floor(mulberry32() * (max - min))
  }
  function bool(chance: number = 0.5) {
    return float() <= chance
  }
  function arr<A>(array: A[]): A {
    const index = int(array.length)
    return array[index]!
  }
  function char(chars = BASE32_STRING_ENCODING) {
    const index = int(chars.length - 1)
    return chars.slice(index, index + 1)
  }
  function string(length: number = 10, encoding = BASE32_STRING_ENCODING) {
    let str = ""
    while (str.length < length) {
      str += char(encoding)
    }
    return str
  }
  function skip(iterations: number = 1) {
    for (let i = 0; i < iterations; i++) mulberry32()
  }
  return { float, int, bool, arr, char, string, skip, seed }
}
