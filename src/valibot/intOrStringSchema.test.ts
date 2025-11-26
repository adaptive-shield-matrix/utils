import { describe, expect, it } from "bun:test"
import * as a from "valibot"
import { intOrStringSchema } from "./intOrStringSchema"

describe("intOrStringSchema", () => {
  it("should pass for valid integers", () => {
    expect(a.safeParse(intOrStringSchema, 0).success).toBe(true)
    expect(a.safeParse(intOrStringSchema, 1).success).toBe(true)
    expect(a.safeParse(intOrStringSchema, -1).success).toBe(true)
  })

  it("should pass for valid integer strings", () => {
    expect(a.safeParse(intOrStringSchema, "0").success).toBe(true)
    expect(a.safeParse(intOrStringSchema, "1").success).toBe(true)
    expect(a.safeParse(intOrStringSchema, "-1").success).toBe(true)
  })

  it("should fail for non-integer numbers", () => {
    expect(a.safeParse(intOrStringSchema, 1.5).success).toBe(false)
    expect(a.safeParse(intOrStringSchema, -1.5).success).toBe(false)
  })

  it("should fail for non-integer strings", () => {
    expect(a.safeParse(intOrStringSchema, "1.5").success).toBe(false)
    expect(a.safeParse(intOrStringSchema, "abc").success).toBe(false)
    expect(a.safeParse(intOrStringSchema, "").success).toBe(false)
  })
})
