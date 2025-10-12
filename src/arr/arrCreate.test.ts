import { expect, test } from "bun:test"
import { arrCreate } from "./arrCreate"

test("arrCreate: 0", () => {
  expect(arrCreate(0, (i: number) => i)).toEqual([])
})

test("arrCreate: a", () => {
  expect(arrCreate(1, (i: number) => "a")).toEqual(["a"])
})

test("arrCreate: 2", () => {
  expect(arrCreate(2, (i: number) => i)).toEqual([0, 1])
})

test("arrCreate [0,0,0]", () => {
  expect(arrCreate(3, (i: number) => 0)).toEqual([0, 0, 0])
})
