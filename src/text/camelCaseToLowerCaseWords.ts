export function camelCaseToLowerCaseWords(camel: string) {
  const camelCase = camel.replace(/[A-Z]/g, " $&").split(" ")

  let flat = ""

  camelCase.forEach((word) => {
    flat = `${flat + word.charAt(0).toLowerCase() + word.slice(1)} `
  })
  return flat
}
