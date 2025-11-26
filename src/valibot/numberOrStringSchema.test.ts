import { describe, expect, it } from "bun:test"
import * as a from "valibot"
import { numberOrStringSchema } from "~utils/valibot/numberOrStringSchema"

describe("numberOrStringSchema", () => {
  it("should pass for numbers", () => {
    expect(a.safeParse(numberOrStringSchema, 1).success).toBe(true)
    expect(a.safeParse(numberOrStringSchema, 1.5).success).toBe(true)
  })

  it("should pass for valid number strings", () => {
    expect(a.safeParse(numberOrStringSchema, "1").success).toBe(true)
    expect(a.safeParse(numberOrStringSchema, "1.5").success).toBe(true)
  })

  it("should fail for invalid inputs", () => {
    expect(a.safeParse(numberOrStringSchema, "abc").success, "abc").toBe(false)
    expect(a.safeParse(numberOrStringSchema, "").success, "empty").toBe(false)
    expect(a.safeParse(numberOrStringSchema, null).success, "null").toBe(false)
  })
})
