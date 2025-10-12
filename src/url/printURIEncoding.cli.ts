/**
 * https://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
 */
const arr = []
for (let i = 0; i < 256; i++) {
  const char = String.fromCharCode(i)
  if (encodeURI(char) !== encodeURIComponent(char)) {
    arr.push({
      character: char,
      // encodeURI: encodeURI(char),
      encodeURIComponent: encodeURIComponent(char),
    })
  }
}
console.table(arr)
