import { describe, expect, it } from "bun:test"
import * as v from "valibot"
import { intOrStringSchema } from "./intOrStringSchema"

describe("intOrStringSchema", () => {
  it("should pass for valid integers", () => {
    expect(v.safeParse(intOrStringSchema, 0).success).toBe(true)
    expect(v.safeParse(intOrStringSchema, 1).success).toBe(true)
    expect(v.safeParse(intOrStringSchema, -1).success).toBe(true)
  })

  it("should pass for valid integer strings", () => {
    expect(v.safeParse(intOrStringSchema, "0").success).toBe(true)
    expect(v.safeParse(intOrStringSchema, "1").success).toBe(true)
    expect(v.safeParse(intOrStringSchema, "-1").success).toBe(true)
  })

  it("should fail for non-integer numbers", () => {
    expect(v.safeParse(intOrStringSchema, 1.5).success).toBe(false)
    expect(v.safeParse(intOrStringSchema, -1.5).success).toBe(false)
  })

  it("should fail for non-integer strings", () => {
    expect(v.safeParse(intOrStringSchema, "1.5").success).toBe(false)
    expect(v.safeParse(intOrStringSchema, "abc").success).toBe(false)
    expect(v.safeParse(intOrStringSchema, "").success).toBe(false)
  })
})
