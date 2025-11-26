import * as a from "valibot"

const stringToNumberSchema = a.pipe(
  a.string(),
  a.minLength(1),
  a.custom((input) => !isNaN(Number(input)), "Invalid number string"),
  a.transform((input) => Number(input)),
)
export const numberOrStringSchema = a.union([a.number(), stringToNumberSchema])
