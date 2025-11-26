import * as a from "valibot"

export type DateOnlyFormat = keyof typeof dateOnlyFormat

export const dateOnlyFormat = {
  full: "full",
  numeric: "numeric",
  short: "short",
  // https://stackoverflow.com/questions/25050034/get-iso-8601-using-intl-datetimeformat
  // the point is to use a locale such as Canada or Sweden where ISO 8601 has been adopted so the locale format is very unlikely to change.
  // Sweden (sv-SE) is actually better than Canada because it doesn't add a non-standard comma and uses more conformant timezone identifiers.
  iso: "iso",
} as const

export const dateOnlyFormatSchema = a.enum(dateOnlyFormat)
