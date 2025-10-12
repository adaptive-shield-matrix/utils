import { objRemoveUndefinedAndNull } from "~utils/obj/objRemoveUndefinedAndNull"

export function queryString(o: Record<string, string | number | undefined | null>): string {
  return new URLSearchParams(objRemoveUndefinedAndNull(o)).toString()
}
