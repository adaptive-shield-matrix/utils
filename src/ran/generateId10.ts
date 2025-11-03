import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(10)

export function generateId10(): string {
  return gen()
}
