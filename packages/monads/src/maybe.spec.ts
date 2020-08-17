/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Maybe } from './maybe'

const fahrenheitToCelsius = (a: any) => (a - 32) * 0.5556

const display = <A>(a: A): A => {
  console.log(a)
  return a
}

const reading1 = 15
const reading2 = null

const temp1C = Maybe.of(reading1)
  .map(fahrenheitToCelsius)
  .fork(
    _ => display('ERR!'), //
    t => display(`${t}C`) //
  ) //?

// console.log(temp1C.inspect())
// > Just(-9.4444)

const temp2C = Maybe.of(reading2)
  .map(fahrenheitToCelsius)
  .fork(_ => display('ERR!'), t => display(`${t}C`)) //?

// console.log(temp2C.inspect())
// > Nothing()
