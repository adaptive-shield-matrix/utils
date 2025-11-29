import * as a from "valibot"

export const dateTimeLocalSchema = a.pipe(a.string(), a.nonEmpty(), a.isoDateTime())
