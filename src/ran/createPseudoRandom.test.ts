import { expect, test } from "bun:test"
import { createPseudoRandom } from "./createPseudoRandom"

test("createPseudoRandom.float distribution", () => {
  const r = createPseudoRandom(0)
  const arr: number[] = Array.from({ length: 10 }, (_, i) => 0)
  const tests = 1000
  for (let i = 0; i < tests; i++) {
    const n = r.float()
    expect(n).toBeGreaterThanOrEqual(0)
    expect(n).toBeLessThan(1)
    const index = Math.round(n * 10) % 10
    expect(Number.isFinite(n)).toBeTruthy()
    expect(Number.isInteger(index)).toBeTruthy()
    // console.log(i, n, index)
    arr[index] = (arr[index] ?? 0) + 1
  }
  // console.log(arr.length)
  // console.table(arr)
  for (const e of arr) {
    expect(e).toBeGreaterThanOrEqual(tests / 100)
  }
})

test("createPseudoRandom.int", () => {
  const r = createPseudoRandom(0)
  for (let i = 0; i < 100; i++) {
    const n = r.int(100)
    expect(n).toBeGreaterThanOrEqual(0)
    expect(n).toBeLessThan(100)
  }
})
