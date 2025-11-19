/**
 * clamp is a way to restrict a number between two other numbers
 */
export function numClamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max))
}
