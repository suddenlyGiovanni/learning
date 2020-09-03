/*
  eslint-disable
  @typescript-eslint/no-non-null-assertion,
  class-methods-use-this,
  id-length,
  max-classes-per-file,
  max-statements,
*/

import assert, { AssertionError } from '../utils/assert'
/*
 * Create a data structure KStacks that represents a set of k stacks. It should only use one array.
 * The following methods must be supported by KStacks.
 *
 * push(val, stackNumber) –> pushes x to stack number ‘sn’ where sn is from 0 to k-1
 * pop(stackNumber) –> pops an element from stack number ‘sn’ where sn is from 0 to k-1
 */

export type Brand<K, T extends string> = K & { __brand: T }

type Int = Brand<number, 'Int'>

type PositiveInt = Brand<number, 'PositiveInt'>
type PositiveIntWithout0 = Brand<number, 'PositiveIntWithout0'>

/**
 * KStacks is a data structure that represents a set of k stacks.
 * It only use one array as the underlying storage mechanism.
 * @template T
 */
export interface IKStack<T> {
  /**
   * Returns the Head of the specified Stack without removing it
   * @param {number} stackNumber - index representing a specific Stack
   * @returns {undefined | T} head of the specified Stack
   */
  peek(stackNumber: number): undefined | T

  /**
   * Removes and returns the most recently added member to specific Stack
   * @param {number} stackNumber - index representing a specific Stack
   * @returns {T | undefined}
   */
  pop(stackNumber: number): undefined | T

  /**
   * Adds a member `x` to the specified Stack
   * @param {T} x - value to add to the specified Stack
   * @param {number} stackNumber - index representing a specific Stack
   */
  push(x: T, stackNumber: number): void
}

export class KStack<T> implements IKStack<T> {
  private readonly hashTableKHeads: Map<PositiveIntWithout0, PositiveInt>

  private readonly hashTableKTails: Map<PositiveIntWithout0, PositiveInt>

  private readonly k: PositiveIntWithout0

  private readonly storage: (undefined | T)[]

  public constructor(numberOfStacks: number) {
    this.assertPositiveIntWithout0(numberOfStacks)
    // K represent the distance in index between each head of the stack
    this.k = numberOfStacks
    // Initialize the storage as an empty array
    this.storage = Array(this.k) as (undefined | T)[]
    this.hashTableKHeads = this.makeHashTableK(this.k)
    this.hashTableKTails = this.makeHashTableK(this.k)
  }

  public peek(stackNumber: number): T | undefined {
    this.assertPositiveIntWithout0(stackNumber)
    this.assertValidKStack(stackNumber)

    const kTailIndex = this.getTailIndexK(stackNumber)
    return this.storage[kTailIndex]
  }

  public pop(stackNumber: number): T | undefined {
    this.assertPositiveIntWithout0(stackNumber)
    this.assertValidKStack(stackNumber)

    const kHeadIndex = this.getHeadIndexK(stackNumber)
    const kTailIndex = this.getTailIndexK(stackNumber)
    const kTail = this.storage[kTailIndex]

    // Clear kTail
    this.storage[kTailIndex] = undefined

    // Set the new KTail index
    const newKTailIndex = (kTailIndex - this.k) as PositiveInt
    if (newKTailIndex <= kHeadIndex) {
      this.setTailIndexK(stackNumber, kHeadIndex)
    } else {
      this.setTailIndexK(stackNumber, newKTailIndex)
    }
    return kTail
  }

  public push(x: T, stackNumber: number): void {
    this.assertPositiveIntWithout0(stackNumber)
    this.assertValidKStack(stackNumber)

    const kHeadIndex = this.getHeadIndexK(stackNumber)
    const kTailIndex = this.getTailIndexK(stackNumber)

    // Is this the head???
    if (this.storage[kHeadIndex] === undefined) {
      // We need to push the head
      this.storage[kHeadIndex] = x
    } else {
      const newKTailIndex = (kTailIndex + this.k) as PositiveInt
      this.storage[newKTailIndex] = x
      this.setTailIndexK(stackNumber, newKTailIndex)
    }
  }

  private assertInt(x: number): asserts x is Int {
    if (!Number.isInteger(x)) {
      throw new AssertionError('`x` is not an Integers')
    }
  }

  private assertPositiveInt(x: number): asserts x is PositiveInt {
    this.assertInt(x)
    if (x < 0) {
      throw new AssertionError('`x` should be an Integer grater than 0')
    }
  }

  private assertPositiveIntWithout0(
    x: number
  ): asserts x is PositiveIntWithout0 {
    this.assertInt(x)
    if (x < 1) {
      throw new AssertionError('`x` should be an Integer grater or equal to 1')
    }
  }

  private assertValidKStack(kStack: PositiveIntWithout0): void {
    assert(
      kStack > 0 && kStack <= this.k,
      `'kStack' is not within the k bounds:  0 < kStack <= ${this.k}`
    )
  }

  private getHeadIndexK(k: PositiveIntWithout0): PositiveInt {
    assert(
      this.hashTableKHeads.has(k),
      'k is not present in the hashTableKHeads'
    )
    return this.hashTableKHeads.get(k)!
  }

  private getTailIndexK(k: PositiveIntWithout0): PositiveInt {
    assert(
      this.hashTableKTails.has(k),
      'k is not present in the hashTableKTails'
    )
    return this.hashTableKTails.get(k)!
  }

  private makeHashTableK(
    k: PositiveIntWithout0
  ): Map<PositiveIntWithout0, PositiveInt> {
    const hashTableK = new Map<PositiveIntWithout0, PositiveInt>()

    for (let i = 1; i <= k; i++) {
      const key = i
      const value = i - 1
      this.assertPositiveIntWithout0(key)
      this.assertPositiveInt(value)
      hashTableK.set(key, value)
    }
    return hashTableK
  }

  private setTailIndexK(k: PositiveIntWithout0, newKTailIndex: PositiveInt) {
    this.hashTableKTails.set(k, newKTailIndex)
  }
}
