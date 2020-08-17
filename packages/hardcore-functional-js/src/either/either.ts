// Either
import { Fn, identity } from "src/functor/functor"

export type Either<L, R> = Left<L> | Right<R>

export interface RightI<T> {
  chain: <B>(f: Fn<T, B>) => B
  map: <B>(f: Fn<T, B>) => RightI<B>
  fold: <B, F extends (...args: any[]) => any>(f: F, g: Fn<T, B>) => B
  toString: () => string // Right(${x})
}

export interface LeftI<T> {
  chain: <F extends (...args: any[]) => any>(f: F) => LeftI<T>
  map: <F extends (...args: any[]) => any>(f: F) => LeftI<T>
  fold: <B, G extends (...args: any[]) => any>(f: Fn<T, B>, g: G) => B
  toString: () => string // `Left(${x})`,
}

export class Right<T> implements RightI<T> {
  private readonly x: T
  public constructor(x: T) {
    this.x = x
  }

  /**
   * f => Right(f(x))
   * @template B
   * @param {Fn<T, B>} f
   * @returns {Right<B>}
   * @memberof Right
   */
  public map<B>(f: Fn<T, B>): Right<B> {
    return new Right(f(this.x))
  }

  /**
   * f => f(x)
   * @template B
   * @param {Fn<T, B>} f
   * @returns {B}
   * @memberof Right
   */
  public chain<B>(f: Fn<T, B>): B {
    return f(this.x)
  }

  public inspect(): string {
    return `Right(${this.x})`
  }

  /**
   * (_, g) => g(x),
   * @template B
   * @template C
   * @param {Fn<T, C>} f
   * @param {Fn<T, B>} g
   * @returns {B}
   * @memberof Right
   */
  public fold<B, C>(_: Fn<T, C>, g: Fn<T, B>): B {
    return g(this.x)
  }
}

export class Left<T> implements LeftI<T> {
  private readonly x: T
  public constructor(x: T) {
    this.x = x
  }
  public chain<B>(_: Fn<T, B>): Left<T> {
    return new Left(this.x)
  }
  public map<B>(_: Fn<T, B>): Left<T> {
    return new Left(this.x)
  }
  public fold<B, C>(f: Fn<T, B>, _: Fn<T, C>): B {
    return f(this.x)
  }
  public toString(): string {
    return `Left(${this.x})`
  }
}

export const fromNullable = <T>(x: T): Either<undefined, T> =>
  x != null ? new Right(x) : new Left(undefined)

export const tryCatch = <A, B>(f: (...args: A[]) => B): Right<B> | Left<any> => {
  try {
    return new Right(f())
  } catch (e) {
    return new Left(e)
  }
}

export const of = Right
