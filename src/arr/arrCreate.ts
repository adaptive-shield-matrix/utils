/**
 * Creates an array of a given size and helper method to populate.
 * https://twitter.com/cmgriffing/status/1753556666396930127
 *
 * @public
 * @param size - Size of array
 * @param setElement - Populate given cell index, starts with 0
 */
export function arrCreate<T>(size: number, setElement: (index: number) => T): T[] {
  return new Array(size).fill(null).map((_, i) => setElement(i))
}
