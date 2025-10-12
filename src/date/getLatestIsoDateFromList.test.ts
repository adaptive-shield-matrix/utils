import { expect, test } from "bun:test"
import { getLatestIsoDateFromList } from "~utils/date/getLatestIsoDateFromList"

test("getLatestIsoDateFromList", () => {
  const d1 = "2023-01-01"
  const d5 = "2024-01-05"
  const dates = [d1, d5]
  expect(getLatestIsoDateFromList(dates)).toBe(d5)
})
