type AssertEqual<T, Expected> = T extends Expected ? (Expected extends T ? true : never) : never
const id = <A>(a: A): A => a

// pipe1
export function pipe<A extends any[], B>(ab: (...args: A) => B): (...args: A) => B
// pipe2
export function pipe<A extends any[], B, C>(
  ab: (...args: A) => B,
  bc: (b: B) => C
): (...args: A) => C
// pipe3
export function pipe<A extends any[], B, C, D>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...args: A) => D
// pipe4
export function pipe<A extends any[], B, C, D, E>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...args: A) => E
// pipe5
export function pipe<A extends any[], B, C, D, E, F>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...args: A) => F
// pipe6
export function pipe<A extends any[], B, C, D, E, F, G>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): (...args: A) => G
// pipe7
export function pipe<A extends any[], B, C, D, E, F, G, H>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): (...args: A) => H
// pipe8
export function pipe<A extends any[], B, C, D, E, F, G, H, I>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): (...args: A) => I
// pipe9
export function pipe<A extends any[], B, C, D, E, F, G, H, I, J>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): (...args: A) => J
// pipe10
export function pipe<A extends any[], B, C, D, E, F, G, H, I, J, K>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J,
  jk: (j: J) => K
): (...args: A) => K

export function pipe<A extends any[]>(
  ab?: Function,
  bc?: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
  fg?: Function,
  gh?: Function,
  hi?: Function,
  ij?: Function,
  jk?: Function
): (...args: A) => unknown {
  const length = arguments.length
  return (...args) => {
    switch (length) {
      case 1:
        return ab!(...args)
      case 2:
        return bc!(ab!(...args))
      case 3:
        return cd!(bc!(ab!(...args)))
      case 4:
        return de!(cd!(bc!(ab!(...args))))
      case 5:
        return ef!(de!(cd!(bc!(ab!(...args)))))
      case 6:
        return fg!(ef!(de!(cd!(bc!(ab!(...args))))))
      case 7:
        return gh!(fg!(ef!(de!(cd!(bc!(ab!(...args)))))))
      case 8:
        return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(...args))))))))
      case 9:
        return ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(...args)))))))))
      case 10:
        return jk!(ij!(hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(...args))))))))))
    }
    return
  }
}

const always = <L, R>(left: L, right?: R): L => left

const pipe01 = pipe(always)('string', 2)
const pipe02 = pipe(always, id)('string', 2)
const pipe03 = pipe(always, id, id)('string', 2)
const pipe04 = pipe(always, id, id, id)('string', 2)
const pipe05 = pipe(always, id, id, id, id)('string', 2)
const pipe06 = pipe(always, id, id, id, id, id)('string', 2)
const pipe07 = pipe(always, id, id, id, id, id, id)('string', 2)
const pipe08 = pipe(always, id, id, id, id, id, id, id)('string', 2)
const pipe09 = pipe(always, id, id, id, id, id, id, id, id)('string', 2)
const pipe10 = pipe(always, id, id, id, id, id, id, id, id, id)('string', 2)
