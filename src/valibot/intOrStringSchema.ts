import * as a from "valibot"
import { numberOrStringSchema } from "~utils/valibot/numberOrStringSchema"

export const intOrStringSchema = a.pipe(numberOrStringSchema, a.integer())
export const intMin0OrStringSchema = a.pipe(numberOrStringSchema, a.integer(), a.minValue(0))
export const intMin1OrStringSchema = a.pipe(numberOrStringSchema, a.integer(), a.minValue(1))
