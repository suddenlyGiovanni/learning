/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

type Maybe<A> = Nothing<A> | Just<A>
function MaybeOf<A extends any | Maybe<A>>(x: A): Maybe<A> {
  return x === null || x === undefined || x.isNothing ? Nothing(x) : Just(x)
}

interface Just<A> {
  chain: <B>(f: (a: A) => B) => B
  emit: () => A
  map: <B>(f: (a: A) => B) => Maybe<B>
  fork: <B, C>(_: (_: void) => C, g: (a: A) => B) => B
  isJust: true
  isNothing: false
  inspect: () => string
}

function Just<A>(a: A): Just<A> {
  return {
    chain: f => f(a),
    emit: () => a,
    map: f => MaybeOf(f(a)),
    fork: (_, g) => g(a),
    isJust: true,
    isNothing: false,
    inspect: () => `just(${a})`,
  }
}

interface Nothing<A> {
  chain: <B>(_: (_: void) => B) => Nothing<A>
  emit: () => Nothing<A>
  map: <B>(_: (_: void) => B) => Nothing<A>
  fork: <B, C>(f: (a: A) => B, _: (_: void) => C) => B
  isJust: false
  isNothing: true
  inspect: () => string
}

function Nothing<A>(a?: A): Nothing<A> {
  return {
    chain: _ => Nothing(),
    emit: () => Nothing(),
    map: _ => Nothing(),
    fork: (f, _) => f(a),
    isJust: false,
    isNothing: true,
    inspect: () => 'Nothing',
  }
}

const exportMaybe = { of: MaybeOf }

export { exportMaybe as Maybe }
