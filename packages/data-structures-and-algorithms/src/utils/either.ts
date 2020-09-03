/*
  eslint-disable
  id-length,
  no-underscore-dangle,
  max-classes-per-file,
  class-methods-use-this
*/

export type Either<L, R> = Left<L, R> | Right<L, R>
export type Fn<A, B> = (a: A) => B

export const trace = <A>(a: A): A => {
  // eslint-disable-next-line no-console
  console.log(a)
  return a
}

export class Left<L, R> {
  private readonly _value: L

  public constructor(value: L) {
    this._value = value
  }

  public toString(): string {
    return `Left(${String(this._value)})`
  }

  public get value(): L {
    return this._value
  }

  public isLeft(): this is Left<L, R> {
    return true
  }

  public isRight(): this is Right<L, R> {
    return false
  }

  public fold<B, C>(f: Fn<L, B>, _: Fn<L, C>): B {
    return f(this._value)
  }
}

export class Right<L, R> {
  private readonly _value: R

  public constructor(value: R) {
    this._value = value
  }

  public toString(): string {
    return `Right(${String(this._value)})`
  }

  public get value(): R {
    return this._value
  }

  public isLeft(): this is Left<L, R> {
    return false
  }

  public isRight(): this is Right<L, R> {
    return true
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
  public fold<B, C>(_: Fn<R, C>, g: Fn<R, B>): B {
    return g(this._value)
  }
}

export const left = <L, R>(l: L): Left<L, R> => new Left<L, R>(l)
export const right = <L, R>(r: R): Right<L, R> => new Right<L, R>(r)

// Examples
const sumPatientCounts = (
  ...patientCounts: number[]
): Either<{ message: string }, number> => {
  return patientCounts.some((patientCount) => patientCount < 0)
    ? left({ message: 'All patient counts should be strictly positive' })
    : right(patientCounts.reduce((acc, cur) => acc + cur, 0))
}
// => Left({ message: 'All patient counts should be strictly positive' } )
sumPatientCounts(-1, 0, 1, 2).fold(trace, trace)

// => Right(3)
sumPatientCounts(0, 1, 2).fold(trace, trace)
