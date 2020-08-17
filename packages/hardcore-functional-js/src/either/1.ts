import { Either, Left, Right, fromNullable } from './either'
import { identity } from "src/functor/functor"
type ColorRecord = Record<'red' | 'blue' | 'yellow', string>
type ColorName = keyof ColorRecord
type HexValue<T extends string = string> = T

const _findColor = (name: ColorName): HexValue => {
  return { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]
}

const _resPresent = _findColor('red').toUpperCase()
// const _resAbsent = _findColor('Brown').toUpperCase() // Cannot read property 'toUpperCase' of undefined
console.log(_resPresent)
// console.log(_resAbsent)

const findColor = (name: ColorName): Either<undefined, HexValue> => {
  const colorMap: ColorRecord = {
    red: '#ff4444',
    blue: '#3b5998',
    yellow: '#fff68f',
  }
  return fromNullable<string>(colorMap[name])
}

const resPresent = findColor('red')
// @ts-expect-error
const resAbsent = findColor('Brown')
console.log(resPresent)
console.log(resAbsent)
