import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(20)

export function generateId20(): string {
  return gen()
}
