import { dateFormatStyle, type DateFormatStyle } from "~utils/date/dateFormatStyle"
import { dateFormatterGetCached } from "./dateFormatterGetCached"

export function dateFormat(date: Date, format: DateFormatStyle, l?: string) {
  const formatter = dateFormatterGetCached(format, l)
  return formatter.format(date)
}

export function dateFormatFull(date: Date | string, l?: string) {
  return dateFormat(typeof date === "string" ? new Date(date) : date, dateFormatStyle.full, l)
}

export function dateFormatNumeric(date: Date | string, l?: string) {
  return dateFormat(typeof date === "string" ? new Date(date) : date, dateFormatStyle.numeric, l)
}

export function dateFormatShort(date: Date | string, l?: string) {
  return dateFormat(typeof date === "string" ? new Date(date) : date, dateFormatStyle.short, l)
}

export function dateFormatIso(date: Date | string, l?: string) {
  return dateFormat(typeof date === "string" ? new Date(date) : date, dateFormatStyle.iso, l)
}
