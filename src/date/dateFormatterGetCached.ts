import { dateFormatterCreate } from "~utils/date/dateFormatterCreate"
import { type DateFormatStyle } from "./dateFormatStyle"

let cachedLocale: string | undefined = undefined
let cachedDateFormat: DateFormatStyle | undefined = undefined
let cachedFormatter: Intl.DateTimeFormat | undefined = undefined

export function dateFormatterGetCached(format: DateFormatStyle, l?: string): Intl.DateTimeFormat {
  if (!cachedFormatter || cachedLocale !== l || cachedDateFormat !== format) {
    cachedLocale = l
    cachedDateFormat = format
    cachedFormatter = dateFormatterCreate(format, l)
  }
  return cachedFormatter
}
