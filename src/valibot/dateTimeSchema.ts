import * as a from "valibot"

export const dateTimeSchema = a.pipe(a.string(), a.isoTimestamp())
