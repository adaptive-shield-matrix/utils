import fs from "fs/promises"
import path from "path"
import { formatGeneratedCodeFile } from "~utils/generate/formatGeneratedCodeFile"
import { jsonStringifyPretty } from "~utils/json/jsonStringifyPretty"

main().catch(console.error)

async function main() {
  const libDir = path.resolve("src")
  const tsFiles = await findTsFiles(libDir, libDir)
  tsFiles.sort()
  const indexFilePath = path.join(libDir, "index.ts")
  await writeIndexFile(tsFiles, libDir, indexFilePath)
  await formatGeneratedCodeFile(indexFilePath)
  // await updatePackageSettings()
}

async function writeIndexFile(tsFiles: string[], libDir: string, indexFilePath: string) {
  const barrelExports = tsFiles.map((filePath) => `export * from './${filePath}';`).join("\n")
  await fs.writeFile(indexFilePath, barrelExports + "\n", "utf8")
  console.log(`Generated lib/index.ts with ${tsFiles.length} exports.`)
}

async function updatePackageSettings() {
  const packageJsonPath = path.resolve("package.json")
  const packageJsonContent = await fs.readFile(packageJsonPath, "utf8")
  const pkg = JSON.parse(packageJsonContent)
  pkg.main = "./dist/index.js"
  pkg.types = "./dist/index.d.ts"
  const data = jsonStringifyPretty(pkg)
  await fs.writeFile(packageJsonPath, data + "\n", "utf8")
  console.log("Updated package.json with main and types pointing to index.")
}

async function findTsFiles(dir: string, baseDir: string): Promise<string[]> {
  const files: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith("generate") || entry.name === "demo_pages") {
        continue
      }
      files.push(...(await findTsFiles(fullPath, baseDir)))
    } else if (
      (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) &&
      !entry.name.match(/\.test\./) &&
      !entry.name.startsWith("generateBarrlImports") &&
      !entry.name.endsWith(".cli.ts") &&
      !entry.name.endsWith(".cliTest.ts")
    ) {
      const relPath = path.relative(baseDir, fullPath).replace(/\.(ts|tsx)$/, "")
      if (relPath) {
        files.push(relPath)
      }
    }
  }
  return files
}
