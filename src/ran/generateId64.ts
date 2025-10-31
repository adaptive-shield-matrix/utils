import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(64)

export function generateId64(): string {
  return gen()
}
