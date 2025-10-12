import { createResult, createResultError, type Result } from "~utils/result/Result"

/**
 * @returns ResultOk<string> with URL-safe Base64
 */
export function base64urlEncodeString<T>(string: string): Result<string> {
  try {
    const utf8 = new TextEncoder().encode(string)
    const encoded = toBase64Url(utf8)
    return createResult(encoded)
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : "Failed to serialize string"
    return createResultError("base64encodeString", errorMessage, string)
  }
}

/**
 * @returns ResultOk<string> with URL-safe Base64
 */
export function base64urlEncodeObject<T>(obj: T): Result<string> {
  try {
    const json = JSON.stringify(obj)
    const utf8 = new TextEncoder().encode(json)
    const encoded = toBase64Url(utf8)
    return createResult(encoded)
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : "Failed to serialize object"
    return createResultError("encodeObject", errorMessage, e?.message)
  }
}

function toBase64Url(bytes: Uint8Array): string {
  // convert bytes → binary string
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("")
  // standard b64
  const b64 = btoa(bin)
  // make URL safe
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

/**
 * @returns ResultOk<T> parsed back
 */
export function base64urlDecodeObject<T>(input: string): Result<any> {
  try {
    const bytes = fromBase64Url(input)
    const json = new TextDecoder().decode(bytes)
    const data = JSON.parse(json)
    return createResult(data)
  } catch (e: any) {
    const errorMessage = e instanceof Error ? e.message : "Failed to deserialize input"
    return createResultError("decodeObject", errorMessage, input)
  }
}

function fromBase64Url(str: string): Uint8Array {
  // restore padding
  const padLen = (4 - (str.length % 4)) % 4
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLen)
  // decode to binary string
  const bin = atob(b64)
  // string → bytes
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i)
  }
  return bytes
}
