import { expect, test } from "bun:test"
import { dateOnlyFormat } from "~utils/date/dateOnlyFormat"
import { formatDate } from "~utils/date/formatDate"

const string = "2024-08-31T12:00:00.000Z"
const date = new Date(string)

const en = "en"
const de = "de"

test("formatDate.full.en", () => {
  const f = formatDate(date, dateOnlyFormat.full, en)
  expect(f).toEqual("August 31, 2024")
})

test("formatDate.full.de", () => {
  const f = formatDate(date, dateOnlyFormat.full, de)
  expect(f).toEqual("31. August 2024")
})

test("formatDate.numeric.en", () => {
  const f = formatDate(date, dateOnlyFormat.numeric, en)
  expect(f).toEqual("8/31/2024")
})

test("formatDate.numeric.de", () => {
  const f = formatDate(date, dateOnlyFormat.numeric, de)
  expect(f).toEqual("31.8.2024")
})

test("formatDate.short.en", () => {
  const f = formatDate(date, dateOnlyFormat.short, en)
  expect(f).toEqual("8/31/24")
})

test("formatDate.short.de", () => {
  const f = formatDate(date, dateOnlyFormat.short, de)
  expect(f).toEqual("31.8.24")
})

test("formatDate.iso8601", () => {
  const f = formatDate(date, dateOnlyFormat.iso)
  expect(f).toEqual("2024-08-31")
})
