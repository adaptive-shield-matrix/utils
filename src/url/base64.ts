import { createResult, createResultError, type Result } from "~utils/result/Result"

export function base64decode1Unsafe(base64: string) {
  return Buffer.from(base64, "base64").toString("binary")
}
export function base64decode1Safe(base64: string): Result<string> {
  try {
    const decoded = base64decode1Unsafe(base64)
    return createResult(decoded)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred during base64 decoding"
    return createResultError("base64Decode", errorMessage, base64)
  }
}

export function base64encode1(str: string) {
  return Buffer.from(str).toString("base64")
}

export function base64encode1Object(o: any) {
  return Buffer.from(JSON.stringify(o)).toString("base64")
}

//
// working in convex runtime
//

export function base64encode2(str: string) {
  return btoa(str)
}

function base64decode2unsafe(str: string) {
  return atob(str)
}

export function base64decode2(str: string) {
  try {
    const decoded = base64decode2unsafe(str)
    return createResult(decoded)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred during base64 decoding"
    return createResultError("base64Decode", errorMessage, str)
  }
}

export function base64encode2url(str: string) {
  return makeBase64UrlSafe(btoa(str))
}

export function base64decode2url(str: string) {
  const restore = restoreBase64(str)
  return base64decode2(restore)
}

function makeBase64UrlSafe(base64Str: string) {
  return base64Str
    .replace(/\+/g, "-") // Convert "+" to "-"
    .replace(/\//g, "_") // Convert "/" to "_"
    .replace(/=+$/, "") // Remove trailing "=" padding
}
function restoreBase64(urlSafeStr: string) {
  const base64 = urlSafeStr
    .replace(/-/g, "+") // Convert "-" back to "+"
    .replace(/_/g, "/") // Convert "_" back to "/"
  // Add padding back (Base64 length must be multiple of 4)
  const padCount = (4 - (base64.length % 4)) % 4
  return base64 + "=".repeat(padCount)
}
