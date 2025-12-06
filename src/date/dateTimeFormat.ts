import { dateTimeFormatStyle, type DateTimeFormatStyle } from "~utils/date/dateTimeFormatStyle"
import { dateTimeFormatterGetCached } from "./dateTimeFormatterGetCached"

export function dateTimeFormat(date: Date|string, format: DateTimeFormatStyle, l?: string) {
  const formatter = dateTimeFormatterGetCached(format, l)
  return formatter.format(typeof date === "string" ? new Date(date) : date)
}

export function formatDateTimeFull(date: Date | string, l?: string) {
  return dateTimeFormat(typeof date === "string" ? new Date(date) : date, dateTimeFormatStyle.full, l)
}

export function formatDateTimeIso(date: Date | string, l?: string) {
  return dateTimeFormat(typeof date === "string" ? new Date(date) : date, dateTimeFormatStyle.iso, l)
}
