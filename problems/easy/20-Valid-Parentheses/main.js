const isValid = function (s) {
  if (s.length < 2) return false
  const subArr = []
  const obj = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (let i = 0; i < s.length; i++) {
    if (obj[s[i]]) {
      subArr.push(s[i])
    } else {
      const poper = subArr.pop()
      if (obj[poper] !== s[i]) {
        return false
      }
    }
  }
  return subArr.length === 0
}

console.log(isValid('([[{)'))
