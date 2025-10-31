import { generateReadableId } from "~utils/ran/generateReadableId"

const gen = generateReadableId(32)

export function generateId32(): string {
  return gen()
}
