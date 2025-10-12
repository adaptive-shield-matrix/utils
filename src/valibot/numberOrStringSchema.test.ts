import { describe, expect, it } from "bun:test"
import * as v from "valibot"
import { numberOrStringSchema } from "~utils/valibot/numberOrStringSchema"

describe("numberOrStringSchema", () => {
  it("should pass for numbers", () => {
    expect(v.safeParse(numberOrStringSchema, 1).success).toBe(true)
    expect(v.safeParse(numberOrStringSchema, 1.5).success).toBe(true)
  })

  it("should pass for valid number strings", () => {
    expect(v.safeParse(numberOrStringSchema, "1").success).toBe(true)
    expect(v.safeParse(numberOrStringSchema, "1.5").success).toBe(true)
  })

  it("should fail for invalid inputs", () => {
    expect(v.safeParse(numberOrStringSchema, "abc").success, "abc").toBe(false)
    expect(v.safeParse(numberOrStringSchema, "").success, "empty").toBe(false)
    expect(v.safeParse(numberOrStringSchema, null).success, "null").toBe(false)
  })
})
