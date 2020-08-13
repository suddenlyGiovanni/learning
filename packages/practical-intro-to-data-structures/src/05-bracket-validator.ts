/* eslint-disable no-plusplus, max-statements */

/*
 * Write a function, is valid that checks if brackets in a string are balanced (properly closed) based on JavaScript syntax rules.
 * valid examples: '{([()])}()' or '()[]'
 * invalid examples: '(' or '[(])'
 */

import { Stack } from './stack'

/**
 * Checks for balanced brackets in a string of code.
 * @param {string} code - a string of code.
 * @return {boolean} - true if valid, otherwise false
 */
export const isBalanced = (code: string): boolean => {
  const leftStack = new Stack<string>()
  let i = 0

  while (i < code.length) {
    const chr = code[i]

    // Check if chr is a leftBrackets, also known as opening brackets
    if (chr === '{' || chr === '[' || chr === '(') {
      leftStack.push(chr)
    }

    // Check if chr is a rightBracket, also known as closing brackets
    if (chr === ')' || chr === ']' || chr === '}') {
      const currentLeft = leftStack.peek()

      if (chr === ')' && currentLeft !== '(') {
        return false
      }

      if (chr === ']' && currentLeft !== '[') {
        return false
      }

      if (chr === '}' && currentLeft !== '{') {
        return false
      }

      // This chr is a closing bracket that is correctly matching an opening one
      leftStack.pop()
    }

    // If chr is anything else, let it flow through

    i++
  }

  return leftStack.isEmpty()
}

/*
 *  Test cases:
 * Input: exp = '[()]{}{[()()]()}'
 * Output: Balanced
 */
// isBalanced('[(])') //?

/*
 * Input: exp = '[(])'
 * Output: Not Balanced
 */
// isBalanced('[()]{}{[()()]()}') //?
