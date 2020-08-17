interface IdentityMonad<A> {
  /**
   * method that just returns the value contained within.
   */
  emit: () => A

  /**
   * method which is intended to chain various monads together
   */
  chain: <B>(f: (x: A) => B) => B
  /**
   * `map` it is the chain function with a built-in rewrapping of the resulting value into a
   * new Identity, which itself can be subject to map, chain, and emit on and on for as many
   * functions you'd like to apply to it.
   */
  map: <B>(f: (x: A) => B) => IdentityMonad<B>

  inspect: () => string
}

interface IIdentityFactory {
  <A>(x: A): IdentityMonad<A>
}

const IdentityFactory: IIdentityFactory = x => ({
  emit: () => x,
  chain: f => f(x),
  map: f => IdentityOf(f(x)),
  inspect: () => `Identity(${x})`
})

const IdentityOf = <A>(x: A) => IdentityFactory(x)

const exportIdentity = {
  of: IdentityOf
}
export { exportIdentity as Identity }
