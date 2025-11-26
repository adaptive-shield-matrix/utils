import { expect, test } from "bun:test"
import * as a from "valibot"
import { dateTimeSchema } from "~utils/valibot/dateTimeSchema"

test("dateTimeSchema", () => {
  const d1 = "2025-07-29T10:54:26.034Z"
  const parsing = a.safeParse(dateTimeSchema, d1)
  expect(parsing.issues).toBeUndefined()
  expect(parsing.success).toBe(true)
})
