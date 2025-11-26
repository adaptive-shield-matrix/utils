import type { ValiError } from "valibot"
import * as a from "valibot"

export function stringifyValibotErrors(e: ValiError<any>): string {
  return a.summarize(e.issues)
}
