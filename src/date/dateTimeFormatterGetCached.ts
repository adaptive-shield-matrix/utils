import { dateTimeFormatterCreate } from "~utils/date/dateTimeFormatterCreate"
import { type DateTimeFormatStyle } from "./dateTimeFormatStyle"

let cachedLocale: string | undefined = undefined
let cachedFormat: DateTimeFormatStyle | undefined = undefined
let cachedFormatter: Intl.DateTimeFormat | undefined = undefined

export function dateTimeFormatterGetCached(format: DateTimeFormatStyle, l?: string): Intl.DateTimeFormat {
  if (!cachedFormatter || cachedLocale !== l || cachedFormat !== format) {
    cachedLocale = l
    cachedFormat = format
    cachedFormatter = dateTimeFormatterCreate(format, l)
  }
  return cachedFormatter
}
