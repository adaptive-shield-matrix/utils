import { createError, createResult, type Result } from "~utils/result/Result"

export function readEnvVariable(name: string): string | undefined {
  // Check Backend/Bun/Node.js/Convex process environment first
  if (typeof process !== "undefined" && process.env) {
    return process.env[name]
  }
  // Check Frontend/Vite-style import.meta.env
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[name]
  }
  return undefined
}

export function readEnvVariableOrThrow(name: string): string | undefined {
  // Check Backend/Bun/Node.js/Convex process environment first
  if (typeof process !== "undefined" && process.env) {
    const variable = process.env[name]
    if (!variable) throw new Error("process.env." + name + " not set or defined")
    return variable
  }
  // Check Frontend/Vite-style import.meta.env
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const variable = import.meta.env[name]
    if (!variable) throw new Error("import.meta.env." + name + " not set or defined")
    return variable
  }
  throw new Error("neither process.env." + name + " nor import.meta.env." + name + " matches")
}

export function readEnvVariableResult(name: string): Result<string> {
  const op = "getEnvVariableResult"
  // Check Backend/Bun/Node.js/Convex process environment first
  if (typeof process !== "undefined" && process.env) {
    const variable = process.env[name]
    if (!variable) {
      return createError(op, "process.env." + name + " not set or defined")
    }
    return createResult(variable)
  }
  // Check Frontend/Vite-style import.meta.env
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const variable = import.meta.env[name]
    if (!variable) {
      return createError(op, "import.meta.env." + name + " not set or defined")
    }
    return createResult(variable)
  }
  return createError(op, "neither process.env." + name + " nor import.meta.env." + name + " matches")
}

export function readEnvVariableBackendResult(name: string): Result<string> {
  const op = "readEnvVariableBackendResult"
  if (typeof process !== "undefined" && process.env) {
    const variable = process.env[name]
    if (!variable) {
      return createError(op, "process.env." + name + " not set or defined")
    }
    return createResult(variable)
  }
  return createError(op, "neither process.env." + name + " nor import.meta.env." + name + " matches")
}
