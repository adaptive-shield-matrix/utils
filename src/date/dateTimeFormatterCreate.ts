import { type DateTimeFormatStyle, dateTimeFormatStyle } from "~utils/date/dateTimeFormatStyle"

export function dateTimeFormatterCreate(format: DateTimeFormatStyle, l?: string): Intl.DateTimeFormat {
  if (format === dateTimeFormatStyle.iso) {
    return new Intl.DateTimeFormat("sv-SE", {
      // date
      year: "numeric",
      month: "numeric",
      day: "numeric",
      // time
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZoneName: "short",
    })
  }
  return new Intl.DateTimeFormat(l, {
    dateStyle: "full",
    timeStyle: "long",
  })
}
