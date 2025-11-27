import * as a from "valibot"

export const dateSchema = a.pipe(a.string(), a.nonEmpty(), a.isoDate())
