// const compose = (f, g) => x => f(g(x));

type Fn = <A>(x: A)=> A

export function compose<R>(...fns: Array<(a:R)=>R>){

  return function<X>(x:X)  {
    return fns.reduceRight((y, f)=> f(y), x)
  }
}

// ex:
const g = (n: number) => n+1
const f = (n:number) => n*2

const composed = g(f(1))  //?

const composeGF = compose(g,f)(1) //?
