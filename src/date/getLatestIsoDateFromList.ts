import { notNullFilter } from "~utils/arr/notNullFilter"

export function getLatestIsoDateFromList(arr: (string | undefined | null)[]): string | null {
  const sorted = arr.filter(notNullFilter)
  sorted.sort().reverse()
  return sorted[0] ?? null
}
