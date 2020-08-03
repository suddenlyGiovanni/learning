import { getData } from '../1-callback/the-meaning-of-life'
import { makeThunk } from './thunks'

const get10 = makeThunk(getData, 10)
const get30 = makeThunk(getData, 30)

get10(function (num1: number): void {
  const x = 1 + num1
  get30(function (num2: number): void {
    const y = 1 + num2

    const getAnswer = makeThunk(getData, `Meaning of life: ${x + y}`)

    getAnswer(function (answer: string): void {
      console.log(answer)
      // Meaning of life: 42
    })
  })
})
