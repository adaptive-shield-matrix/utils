import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(16)

export function generateId16(): string {
  return gen()
}
