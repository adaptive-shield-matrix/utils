export function objRemoveUndefinedAndNull(data: Record<string, any>) {
  const cleanData = Object.entries(data)
    .filter(([key, value]) => value !== undefined && value !== null)
    .reduce(
      (obj, [key, value]) => {
        obj[key] = value
        return obj
      },
      {} as Record<string, any>,
    )
  return cleanData
}

export function objRemoveUndefined(data: Record<string, any>) {
  const cleanData = Object.entries(data)
    .filter(([key, value]) => value !== undefined)
    .reduce(
      (obj, [key, value]) => {
        obj[key] = value
        return obj
      },
      {} as Record<string, any>,
    )
  return cleanData
}
