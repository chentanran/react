class Queue<T> {
  private data = []

  push(params: T) {
    this.data.push(params)
  }

  pop(): T {
    return this.data.shift()
  }
}

const q1 = new Queue<number>()
q1.push(10)
q1.push(20)
q1.push(30)

const q2 = new Queue<string>()
q2.push('www')
q2.push('eee')
q2.push('ttt')

console.log(q2.pop().trim())
// console.log(q1.pop().trim())