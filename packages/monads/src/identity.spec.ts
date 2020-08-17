import { Identity } from './identity'

const one = Identity.of(1) //?

// emit: (alternative names: `join`, `value`)
console.log(one.emit())

// chain: (alternative names: `flatMap`, `bind`)
console.log(one.chain(a => a + 1))

// map: (alternative names: `fmap`)
const onePlusOneMonad = one.map(a => a + 1) //?
console.log(onePlusOneMonad.emit())

const two = one.map(a => a + 1)
console.log(two.inspect())
