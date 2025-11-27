import { describe, expect, it } from "bun:test"
import * as a from "valibot"
import { intSchema, intSchemaMin0 } from "~utils/valibot/intSchema"

describe("intSchema", () => {
  it("should pass for integers", () => {
    expect(a.safeParse(intSchema, 1).success).toBe(true)
    expect(a.safeParse(intSchema, -5).success).toBe(true)
    expect(a.safeParse(intSchema, 0).success).toBe(true)
  })
  it("should fail for non-integers", () => {
    expect(a.safeParse(intSchema, 1.5).success).toBe(false)
    expect(a.safeParse(intSchema, "1").success).toBe(false)
    expect(a.safeParse(intSchema, null).success).toBe(false)
    expect(a.safeParse(intSchema, undefined).success).toBe(false)
  })
})

describe("intSchemaMin0", () => {
  it("should pass for non-negative integers", () => {
    expect(a.safeParse(intSchemaMin0, 0).success).toBe(true)
    expect(a.safeParse(intSchemaMin0, 1).success).toBe(true)
  })
  it("should fail for negative integers", () => {
    expect(a.safeParse(intSchemaMin0, -1).success).toBe(false)
  })
})
