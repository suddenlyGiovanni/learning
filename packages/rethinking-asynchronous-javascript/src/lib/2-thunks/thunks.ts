import { output } from '../fake-ajax'
// example of syncronous thunk:
function add(x: number, y: number): number {
  return x + y
}
export type Thunk<T> = () => T
/**
 * a thunk is a function (a box) wrapping some content <T>
 * the way to retrieve this content is by un-wrapping box, calling the function, executing the thunk
 * the beauty is that thunks can be passed around and then un-wrapped when needed.
 */
const thunk1: Thunk<number> = (): number => {
  return add(10, 15)
}
thunk1 //? () => number
thunk1() //? 25

function addAsync(x: number, y: number, cb: (sum: number) => void): void {
  setTimeout(() => cb(x + y), 1000)
}
export type Callback<A, B> = (a: A) => B
type _Thunk<A> = (cb: Callback<A, void>) => void
const thunk2: _Thunk<number> = (cb: (sum: number) => void): void => {
  addAsync(10, 15, cb)
}
thunk2((sum) => {
  output(sum) //? 25
})

export function makeThunk<T>(...args: [(...args: unknown[]) => void, ...T[]]) {
  const [fn, ..._arguments] = args
  // type _arguments<T extends unknown> = T[]
  // type fn = (...arguments: _arguments, cb: (A) => B) => void
  // return type of makeThunk is a thunk that accepts fn's cb as argument
  // cb has to match the type accepte by the fn callback
  return (cb: (a: T) => void): void => {
    fn(..._arguments, cb)
  }
}
const thunk4 = makeThunk(addAsync, 10, 15)
thunk4(output) //? 25
