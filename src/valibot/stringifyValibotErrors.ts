import type { ValiError } from "valibot"
import * as v from "valibot"

export function stringifyValibotErrors(e: ValiError<any>): string {
  return v.summarize(e.issues)
}
