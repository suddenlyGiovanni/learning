function* gen(): Generator {
  console.log('hello')
  yield
  console.log('world')
  yield
}

const iterator = gen() //? { [Iterator] }
iterator.next() //? { value: undefined, done: false } logs: hello
iterator.next() //? { value: undefined, done: false } logs: world
iterator.next() //? { value: undefined, done: true }

function* main(): Generator<1 | 2 | 3> {
  yield 1
  yield 2
  yield 3
}

const it = main() //?{ [Iterator] }
it.next() //? { value: 1, done: false }
it.next() //? { value: 2, done: false }
it.next() //? { value: 3, done: false }
it.next() //? { value: undefined, done: true }

function* infiniteSequence(): Generator<number> {
  let i = 1
  while (true) {
    yield i++
  }
}

const infiniteSequenceIterator = infiniteSequence() //? { [Iterator] }
const upperBound = 1
for (const number of infiniteSequenceIterator) {
  if (number > upperBound) {
    break
  } else {
    console.log(number)
  }
}

function coroutines<T, TReturn, TNext>(
  generator: () => Generator<T, TReturn, TNext>
) {
  const _iterator = generator()
  return <Args extends unknown[]>(
    ...args: Args
  ): IteratorResult<T, TReturn> => {
    return _iterator.next(...args)
  }
}

const run = coroutines(function* () {
  const x = 1 + (yield)
  const y = 1 + (yield)
  yield x + y
})

run() //? { value: undefined, done: false }
run(10) //? { value: undefined, done: false }
console.log('Meaning of life: ' + run(30).value) // Meaning of life: 42
