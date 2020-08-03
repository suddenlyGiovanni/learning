type GeneratorFn = <T = unknown, TReturn = any, TNext = unknown>(
  ...args: unknown[]
) => Generator<T, TReturn, TNext>

/**
 * @param {(...xs: unknown[])=> Generator} generatorFn the first argument is a generator function
 * @param {...} rest all the subsequent arguments
 * @returns Promise<unknown>
 */
export function run<T extends unknown[]>(...args: [GeneratorFn, ...T]) {
  const [generatorFn, ...rest] = args
  // initialize the generator in the current context
  const iterator = generatorFn(...rest)

  // return a promise for the generator completing
  return Promise.resolve().then(function handleNext(value) {
    // run to the next yielded value
    const next = iterator.next(value)

    return (function handleResult(next) {
      // generator has completed running?
      if (next.done) {
        return next.value
      }
      // otherwise keep going
      else {
        return Promise.resolve(next.value).then(
          // resume the async loop on
          // success, sending the resolved
          // value back into the generator
          handleNext,

          // if `value` is a rejected
          // promise, propagate error back
          // into the generator for its own
          // error handling
          function handleErr(err) {
            return Promise.resolve(iterator.throw(err)).then(handleResult)
          }
        )
      }
    })(next)
  })
}
