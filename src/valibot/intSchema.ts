import * as a from "valibot"

const intSchema = a.pipe(a.number(), a.integer())
const intSchemaMin0 = a.pipe(a.number(), a.integer(), a.minValue(0))
