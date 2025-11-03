import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(15)

export function generateId15(): string {
  return gen()
}
