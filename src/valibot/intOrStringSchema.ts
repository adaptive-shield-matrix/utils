import * as v from "valibot"
import { numberOrStringSchema } from "~utils/valibot/numberOrStringSchema"

export const intOrStringSchema = v.pipe(numberOrStringSchema, v.integer())
export const intMin0OrStringSchema = v.pipe(numberOrStringSchema, v.integer(), v.minValue(0))
export const intMin1OrStringSchema = v.pipe(numberOrStringSchema, v.integer(), v.minValue(1))
