interface IWithLength {
  length: number
}

function withLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

const str = withLength('wer')
const arr = withLength([1,2,3])

const num = withLength({ length: 10 })

console.log(str, arr, num)