import { expect, it } from "bun:test"
import { intRange } from "./intRange"

it("range", () => {
  expect(intRange(3)).toEqual([0, 1, 2])
})

it("rangeStartEnd", () => {
  expect(intRange(3, 3)).toEqual([3, 4, 5])
})
