import { describe, expect, test } from "bun:test"
import {
  dateTimeFormat,
  formatDateTimeFull,
  formatDateTimeIso
} from "./dateTimeFormat"
import { dateTimeFormatStyle } from "./dateTimeFormatStyle"

describe("dateTimeFormat", () => {
  const testDate = new Date("2023-12-25T10:30:45.000Z")

  test("formats date with iso format", () => {
    const result = dateTimeFormat(testDate, dateTimeFormatStyle.iso)
    expect(result).toBe("2023-12-25 10:30:45")
  })

  test("formats date with full format", () => {
    const result = dateTimeFormat(testDate, dateTimeFormatStyle.full, "en-US")
    expect(result).toContain("December")
    expect(result).toContain("2023")
    expect(result).toContain("10:30")
  })

  test("formats date time full", () => {
    const result = formatDateTimeFull(testDate, "en-US")
    expect(result).toContain("December")
    expect(result).toContain("2023")
    expect(result).toContain("10:30")
  })

  test("formats date time iso", () => {
    const result = formatDateTimeIso(testDate)
    expect(result).toBe("2023-12-25 10:30:45")
  })

  test("formats date time full with string input", () => {
    const result = formatDateTimeFull("2023-12-25T10:30:45.000Z", "en-US")
    expect(result).toContain("December")
    expect(result).toContain("2023")
    expect(result).toContain("10:30")
  })

  test("formats date time iso with string input", () => {
    const result = formatDateTimeIso("2023-12-25T10:30:45.000Z")
    expect(result).toBe("2023-12-25 10:30:45")
  })
})
