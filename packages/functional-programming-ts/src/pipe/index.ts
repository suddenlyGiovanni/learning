export const pipe = <A>(...fns: Array<(a:A)=> A> ) => (x:A) => fns.reduce((y, f) => f(y),x)
