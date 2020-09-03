/* eslint-disable max-statements, no-undef, no-console */

/**
 * Stacks:
 * A stack is an abstract data type that serves as a collection of elements, with two principal
 * operations:
 * - push: which adds an element to the collection
 * - pop: which removes the most recently added element that was not yet removed
 * - peek: which give access to the top without modifying the stack.
 * the stacks are `LIFO` (last in, first out)
 */

interface Stack<T = string> {
  readonly isEmpty: () => boolean
  readonly length: number
  readonly peek: () => T
  readonly pop: () => T | undefined
  readonly push: (item: T) => void
}

// eslint-disable-next-line func-style
export function createStack<T>(): Stack<T> {
  const array: T[] = []

  return {
    push(item: T) {
      array.push(item)
    },

    pop() {
      return array.pop()
    },

    peek() {
      const lastItemIdx = array.length - 1
      return array[lastItemIdx]
    },

    get length() {
      return array.length
    },

    isEmpty() {
      return array.length === 0
    },
  }
}

export const main = (): void => {
  //  ex. stack clothing...

  const lowerBodyStack = createStack()
  console.log(lowerBodyStack.isEmpty()) // => 'true'

  lowerBodyStack.push('underwear')
  lowerBodyStack.push('socks')
  lowerBodyStack.push('pants')
  lowerBodyStack.push('shoes')

  console.log(lowerBodyStack.peek()) // => 'shoes'

  lowerBodyStack.pop()
  console.log(lowerBodyStack.peek()) // => 'pants'

  lowerBodyStack.pop()
  console.log(lowerBodyStack.peek()) // => 'socks'

  console.log(lowerBodyStack.length) // => '2'
}
// main()
