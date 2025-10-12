import { expect, test } from "bun:test"
import { searchParamsToObject } from "~utils/url/searchParamsToObject"

test("searchParamsToObject", () => {
  const given = "access_token=super-secret-token&scope=user%3Aemail&token_type=bearer"
  const o = searchParamsToObject(given)
  expect(o).toEqual({
    access_token: "super-secret-token",
    scope: "user:email",
    token_type: "bearer",
  })
})
