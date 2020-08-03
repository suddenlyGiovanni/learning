export type Head<R extends unknown[]> = R[0];
export type Tail<R extends unknown[]> = R extends [any, ...infer T] ? T : [];
export type Lead<R extends unknown[]> = R extends [...infer L, any] ? L : [];
export type Last<R extends unknown[]> = R extends [...Lead<R>, infer L] ? L : never;
