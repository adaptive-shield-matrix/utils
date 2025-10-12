import { objectEntries } from "~utils/obj/objectEntries"

export function objToUrlParams2(
  required: Record<string, number | string | boolean | null>,
  optional: Record<string, number | string | boolean | undefined | null>,
): string {
  const search = Object.keys(required)
    .map((key) => `${key}=${required[key]}`)
    .join("&")
  const hash = objectEntries(optional)
    .filter(([k, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join("&")
  return search + (hash ? `&${hash}` : "")
}
export function objToUrlParamsOptional(o: Record<string, number | string | boolean | undefined | null>): string {
  return objectEntries(o)
    .filter(([k, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join("&")
}

export function objToUrlParamsIfNotDefault(
  o: Record<string, number | string | boolean | undefined | null>,
  byDefault: Record<string, number | string | boolean | undefined | null>,
): string {
  return objectEntries(o)
    .filter(([k, v]) => (byDefault[k] ? v !== byDefault[k] : !!v))
    .map(([k, v]) => `${k}=${v}`)
    .join("&")
}

export function objToUrlParams(o: Record<string, number | string | boolean>): string {
  return Object.keys(o)
    .map((key) => `${key}=${o[key]}`)
    .join("&")
}

export function objToUrlParamsEncoded(o: Record<string, number | string>): string {
  return Object.keys(o)
    .map((key) => {
      const ok = o[key]
      return ok ? `${key}=${encodeURIComponent(ok)}` : ""
    })
    .join("&")
}

/**
 * https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
 * @param url
 */
export function urlParamsToObject(url: string) {
  return Object.fromEntries(new URLSearchParams(url))
}
