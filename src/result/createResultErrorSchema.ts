import * as v from "valibot"
import { type ResultErr, createResultError } from "~utils/result/Result"
import { stringifyValibotErrors } from "~utils/valibot/stringifyValibotErrors"

export function createResultErrorSchema(op: string, valibotError: v.ValiError<any>, errorData?: string): ResultErr {
  // const errorMessage = valibotError.issues.map((issue) => issue.message).join(", ")
  const errorMessage = stringifyValibotErrors(valibotError)
  return createResultError(op, errorMessage, errorData)
}
