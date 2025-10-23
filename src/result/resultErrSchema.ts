import * as v from "valibot"

export const resultErrSchema = v.object({
  success: v.literal(false),
  op: v.string(),
  errorMessage: v.string(),
  errorData: v.optional(v.union([v.string(), v.null()])),
  statusCode: v.optional(v.number())
})

export const resultErrSchemaFromJsonString = v.pipe(v.string(), v.parseJson(), resultErrSchema)
