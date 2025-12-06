import { expect, test } from "bun:test"
import { dateFormat } from "~utils/date/dateFormat"
import { dateFormatStyle } from "~utils/date/dateFormatStyle"

const string = "2024-08-31T12:00:00.000Z"
const date = new Date(string)

const en = "en"
const de = "de"

test("dateFormat.full.en", () => {
  const f = dateFormat(date, dateFormatStyle.full, en)
  expect(f).toEqual("August 31, 2024")
})

test("dateFormat.full.de", () => {
  const f = dateFormat(date, dateFormatStyle.full, de)
  expect(f).toEqual("31. August 2024")
})

test("dateFormat.numeric.en", () => {
  const f = dateFormat(date, dateFormatStyle.numeric, en)
  expect(f).toEqual("8/31/2024")
})

test("dateFormat.numeric.de", () => {
  const f = dateFormat(date, dateFormatStyle.numeric, de)
  expect(f).toEqual("31.8.2024")
})

test("dateFormat.short.en", () => {
  const f = dateFormat(date, dateFormatStyle.short, en)
  expect(f).toEqual("8/31/24")
})

test("dateFormat.short.de", () => {
  const f = dateFormat(date, dateFormatStyle.short, de)
  expect(f).toEqual("31.8.24")
})

test("dateFormat.iso8601", () => {
  const f = dateFormat(date, dateFormatStyle.iso)
  expect(f).toEqual("2024-08-31")
})
