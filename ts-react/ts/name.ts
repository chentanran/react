type NameFunc = () => number
type NameFuncStr = string | NameFunc

function arrqq(num: NameFuncStr ): string | number {
  if (typeof num === 'string') {
    return num
  }
  return num()
}

const arr1 =  arrqq(() => {
  return 111
})

console.log(arr1)