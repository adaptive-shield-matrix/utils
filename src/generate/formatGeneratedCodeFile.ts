import { runCmdAsync } from "~utils/bun/runCmdAsync"

export async function formatGeneratedCodeFile(outputPath: string) {
  const cmd = `bun run biome check --write ${outputPath}`.split(" ")
  return runCmdAsync(cmd, true)
}
