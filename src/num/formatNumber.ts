let numberFormat: Intl.NumberFormat | undefined = undefined
let numberFormatLocale: string | undefined = undefined

export function formatNumber(num: number, locale?: string) {
  if (locale === numberFormatLocale && numberFormat) {
    return numberFormat.format(num)
  }
  numberFormat = new Intl.NumberFormat(locale)
  numberFormatLocale = locale
  return numberFormat.format(num)
}
