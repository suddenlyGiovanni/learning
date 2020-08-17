import { Functor, identity } from './functor'

const nextCharForNumberString_ = (str: string): string => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}
const result_ = nextCharForNumberString_('  64 ')

console.log(result_)

const nextCharForNumberString = (str: string) =>
  Functor.of(str)
    .map(x => x.trim())
    .map(parseInt)
    .map(x => x + 1)
    .map(String.fromCharCode)
    .fold(identity)

const result = nextCharForNumberString('  64 ')

console.log(result)
