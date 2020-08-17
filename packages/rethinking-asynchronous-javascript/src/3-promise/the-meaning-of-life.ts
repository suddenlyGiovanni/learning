import { output } from '../fake-ajax'

function getData<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000)
  })
}

export const main = (): void => {
  // eslint-disable-next-line init-declarations
  let x: number
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  getData(10)
    .then((num1) => {
      x = 1 + num1
      return getData(30)
    })
    .then((num2) => {
      const y = 1 + num2
      return getData(`Meaning of life: ${x + y}`)
    })
    .then(output)
}
// main()
