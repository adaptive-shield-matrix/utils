import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(12)

export function generateId12(): string {
  return gen()
}
