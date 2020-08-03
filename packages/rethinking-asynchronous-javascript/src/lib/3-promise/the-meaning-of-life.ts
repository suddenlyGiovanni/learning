import { output } from '../fake-ajax'

function getData<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000)
  })
}


let x: number
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
