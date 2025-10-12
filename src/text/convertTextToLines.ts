export function convertTextToLines(text: string): string[] {
  const op = "convertTextToLines"
  if (!text) return []
  const lines = text.split("\n").map((t) => t.trimEnd())
  // console.log(op, { lines })
  const singleLine = lines.length === 1
  if (singleLine) {
    const line0 = lines[0]
    if (!line0) return []
    if (line0.length <= 0) return []
    return lines
  }
  return lines
}
