export type NArityFn<Args extends unknown[] = unknown[], Result = unknown> = (
  ...args: [...Args]
) => Result
export type UnaryFn<A, B> = NArityFn<[A], B>
export type BinaryFn<A, B, C> = NArityFn<[A, B], C>
export type TernaryFn<A, B, C, D> = NArityFn<[A, B, C], D>
