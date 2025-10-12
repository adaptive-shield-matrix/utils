import * as v from "valibot"

const stringToNumberSchema = v.pipe(
  v.string(),
  v.minLength(1),
  v.custom((input) => !isNaN(Number(input)), "Invalid number string"),
  v.transform((input) => Number(input)),
)
export const numberOrStringSchema = v.union([v.number(), stringToNumberSchema])
