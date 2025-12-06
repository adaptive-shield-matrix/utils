import * as v from "valibot"

export type DateTimeFormatStyle = keyof typeof dateTimeFormatStyle

export const dateTimeFormatStyle = {
  iso: "iso",
  full: "full",
} as const

export const dateTimeFormatStyleSchema = v.enum(dateTimeFormatStyle)
