export type Fn<A, B> = (a: A) => B

export interface FunctorI<T> {
  map: <B extends T>(fn: (a: T) => B) => Functor<B>
}
/**
 * Functor
 * a Functor contract define a map method
 *
 * @export
 * @class Functor
 */

export class Functor<T> implements FunctorI<T> {
  protected x: T
  protected constructor(x: T) {
    this.x = x
  }
  public map<B extends T>(f: Fn<T, B>): Functor<B> {
    return new Functor(f(this.x))
  }

  public fold<B>(f: Fn<T, B>): B {
    return f(this.x)
  }
  public inspect(): string {
    return `Functor(${this.x})`
  }

  public static of<A>(a: A): Functor<A> {
    return new Functor(a)
  }
}

export const identity = <T>(x: T): T => x
