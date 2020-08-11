
export class AssertionError extends Error {
  // eslint-disable-next-line no-useless-constructor
  public constructor(message?: string) {
    super(message)
  }
}

// eslint-disable-next-line func-style
export default function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg)
  }
}
