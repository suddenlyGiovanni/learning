export interface Functor<T> {
  map: <B extends T>(fn: (a: T) => B) => Functor<B>
}

export interface Applicative<T> {
  // static
  of: <A extends T>(a: A) => Applicative<A>
}


interface Apply<T> extends Functor<T> {
  ap: <A, B extends T>(f: (a: A) => B) => Apply<B>
}
