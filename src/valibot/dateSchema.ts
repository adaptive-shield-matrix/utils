import * as v from "valibot"

export const dateSchema = v.pipe(v.string(), v.isoDate())
