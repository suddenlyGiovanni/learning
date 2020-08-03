export function getData<A>(a: A, cb: (a: A) => void): void {
  setTimeout(() => cb(a), 1000)
}

getData(10, function (num1: number): void {
  const x = 1 + num1
  getData(30, function (num2: number): void {
    const y = 1 + num2
    getData(`Meaning of life: ${x + y}`, function (answer: string): void {
      console.log(answer) // Meaning of life: 42
    })
  })
})
