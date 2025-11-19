import { dateOnlyFormat, type DateOnlyFormat } from "~utils/date/dateOnlyFormat"

export function formatDate(date: Date, format: DateOnlyFormat, l?: string) {
  const formatter = getCachedDateFormatter(format, l)
  return formatter.format(date)
}

export function formatDateString(date: string, format: DateOnlyFormat, l?: string) {
  return formatDate(new Date(date), format, l)
}

export function formatDateStringSafe(
  date: string | null,
  format: DateOnlyFormat,
  fallback: string = "",
  l?: string,
): string {
  if (!date) return fallback
  return formatDateString(date, format, l)
}

export function formatDateFull(date: Date | string, l?: string) {
  return formatDate(typeof date === "string" ? new Date(date) : date, dateOnlyFormat.full, l)
}

export function formatDateNumeric(date: Date | string, l?: string) {
  return formatDate(typeof date === "string" ? new Date(date) : date, dateOnlyFormat.numeric, l)
}

export function formatDateShort(date: Date | string, l?: string) {
  return formatDate(typeof date === "string" ? new Date(date) : date, dateOnlyFormat.short, l)
}

export function formatDateIso(date: Date | string, l?: string) {
  return formatDate(typeof date === "string" ? new Date(date) : date, dateOnlyFormat.iso, l)
}

let cachedLocale: string | undefined = undefined
let cachedDateFormat: DateOnlyFormat | undefined = undefined
let cachedFormatter: Intl.DateTimeFormat | undefined = undefined

function getCachedDateFormatter(format: DateOnlyFormat, l?: string): Intl.DateTimeFormat {
  if (!cachedFormatter || cachedLocale !== l || cachedDateFormat !== format) {
    cachedLocale = l
    cachedDateFormat = format
    cachedFormatter = createFormatter(format, l)
  }
  return cachedFormatter
}

function createFormatter(format: DateOnlyFormat, l?: string): Intl.DateTimeFormat {
  switch (format) {
    case dateOnlyFormat.full: {
      return new Intl.DateTimeFormat(l ?? undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    case dateOnlyFormat.numeric: {
      return new Intl.DateTimeFormat(l ?? undefined, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    }
    case dateOnlyFormat.short: {
      return new Intl.DateTimeFormat(l ?? undefined, {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      })
    }
    case dateOnlyFormat.iso: {
      return new Intl.DateTimeFormat("sv-SE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    }
  }
}
