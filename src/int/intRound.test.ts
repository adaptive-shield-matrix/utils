import { expect, test } from "bun:test"
import { intRound5 } from "./intRound"

test("round5", () => {
  expect(intRound5(0.05)).toBe(0)
  expect(intRound5(0.5)).toBe(0)
  expect(intRound5(0)).toBe(0)
  expect(intRound5(3)).toBe(5)
  expect(intRound5(13)).toBe(15)
  expect(intRound5(46.9)).toBe(45)
  expect(intRound5(51.78)).toBe(50)
})
