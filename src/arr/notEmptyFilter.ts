export function notEmptyFilter<T>(value: T): value is NonNullable<T> {
  return !!value
}
