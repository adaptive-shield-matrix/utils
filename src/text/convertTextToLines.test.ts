import { expect, test } from "bun:test"
import { convertTextToLines } from "~utils/text/convertTextToLines"

test("convertTextToLines: 1 line", () => {
  const lines = convertTextToLines("a")
  expect(lines).toEqual(["a"])
})

test("convertTextToLines: 3 lines", () => {
  const lines = convertTextToLines("a\nb\nc")
  expect(lines).toEqual(["a", "b", "c"])
})
