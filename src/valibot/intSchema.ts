import * as a from "valibot"

export const intSchema = a.pipe(a.number(), a.integer())
export const intSchemaMin0 = a.pipe(a.number(), a.integer(), a.minValue(0))
