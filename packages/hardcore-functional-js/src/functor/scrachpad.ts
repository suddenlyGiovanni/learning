
interface Functor<T> {
  map: <B extends T>(fn: (a: T) => B) => Functor<B>
}

class F<T> implements Functor<T> {
  private readonly x
  constructor(x: T) {
    this.x = x
  }
  public map<B extends T>(fn: (a: T) => B): Functor<B> {
    return new F(fn(this.x))
  }
  public static of<A>(x: A): Functor<A> {
    return new F(x)
  }
}

const fFunctorInstanceNumber = F.of(2)
const fFunctorInstanceString = F.of('string')
fFunctorInstanceString.map(s => s.length) // Ts error: Type 'number' is not assignable to type 'string'.

fFunctorInstanceString.map(s => s.toLowerCase()) // ok
fFunctorInstanceNumber.map(n => String.fromCharCode(n)) // Ts error: Type 'string' is not assignable to type 'number'.

fFunctorInstanceNumber.map(n => n* 2) // ok
