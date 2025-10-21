import { jsonStringifyPretty } from "@utils/json/jsonStringifyPretty"
import console from "node:console"
import type { BunCmd } from "./BunCmd"

export async function runCmdAsync(cmd: string[], logBunCmd: boolean = true): Promise<BunCmd> {
  const startedAt = performance.now()
  if (logBunCmd) {
    console.log({ cmd })
  }
  const process = Bun.spawn(cmd, {
    stdout: "pipe",
    stderr: "pipe",
  })
  const exitCode = await process.exited
  const output = await process.stdout.text()
  const error = await process.stderr.text()
  const outputLines = output.split("\n").filter((s) => s.length > 0)
  const errorLines = error.split("\n").filter((s) => s.length > 0)
  const lines = [...outputLines, ...errorLines]
  const endedAt = performance.now()
  const ms = Math.round(endedAt - startedAt)
  const r: BunCmd = {
    cmd,
    success: exitCode === 0,
    exitCode,
    lines,
    ms,
  }
  if (logBunCmd) {
    if (lines.length < 8) {
      console.log(r)
    } else {
      const l: Omit<BunCmd, "lines"> = {
        cmd,
        success: exitCode === 0,
        exitCode,
        ms,
      }
      console.log(l)
      console.log(jsonStringifyPretty(lines))
    }
  }
  return r
}
