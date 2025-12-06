import { type DateFormatStyle, dateFormatStyle } from "~utils/date/dateFormatStyle"

export function dateFormatterCreate(format: DateFormatStyle, l?: string): Intl.DateTimeFormat {
  switch (format) {
    case dateFormatStyle.full: {
      return new Intl.DateTimeFormat(l ?? undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    case dateFormatStyle.numeric: {
      return new Intl.DateTimeFormat(l ?? undefined, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    }
    case dateFormatStyle.short: {
      return new Intl.DateTimeFormat(l ?? undefined, {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      })
    }
    case dateFormatStyle.iso: {
      return new Intl.DateTimeFormat("sv-SE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    }
  }
}
