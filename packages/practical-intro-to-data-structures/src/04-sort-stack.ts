/* eslint-disable no-plusplus, max-statements */

import { IStack, Stack, feedStack } from './stack'
/**
 * Implement the function `sortStack`
 *
 * We follow this algorithm.
 * 1 - Create a temporary stack say tmpStack.
 * 2 - While input stack is NOT empty do this:
 *      - Pop an element from input stack call it temp
 *      - while temporary stack is NOT empty and top of temporary stack is greater than temp,
 *        pop from temporary stack and push it to the input stack
 *      - push temp in temporary stack
 * 3 - The sorted numbers are in tmpStack
 */

/**
 * Sorts a stack with smallest values on top
 * @template T - any
 * @param {IStack} inputStack - the stack to sort
 * @return {IStack} - sorted stack
 */
export const sortStack = <T>(inputStack: IStack<T>): IStack<T> => {
  const tmpStack = new Stack<T>()

  while (!inputStack.isEmpty()) {
    const temp = inputStack.pop()!

    while (!tmpStack.isEmpty() && tmpStack.peek()! > temp) {
      inputStack.push(tmpStack.pop()!)
    }
    tmpStack.push(temp)
  }
  // Hurrah! tmpStack is now sorted. the holds the larger value. now we need to reverse the order
  while (!tmpStack.isEmpty()) {
    inputStack.push(tmpStack.pop()!)
  }
  return inputStack
}


const unsortedStack = feedStack(new Stack<number>())([
  34,
  3,
  31,
  98,
  92,
  23,
])

const sortedSack = sortStack(unsortedStack)
console.log(JSON.stringify(sortedSack))
