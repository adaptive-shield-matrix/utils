import * as a from "valibot"

export const resultErrSchema = a.object({
  success: a.literal(false),
  op: a.string(),
  errorMessage: a.string(),
  errorData: a.optional(a.union([a.string(), a.null()])),
  statusCode: a.optional(a.number()),
})

export const resultErrSchemaFromJsonString = a.pipe(a.string(), a.parseJson(), resultErrSchema)
