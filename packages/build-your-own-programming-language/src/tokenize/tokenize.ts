/** lexer */

import {
  isNumber,
  isParenthesis,
  isWhitespace,
  isLetter,
  isQuote,
} from '../identify/identify'
import { Token, Type, buildToken } from './token'

export function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let cursor = 0

  while (cursor < input.length) {
    const character = input[cursor]

    /** should tokenize parentheses */
    if (isParenthesis(character)) {
      tokens.push(buildToken(Type.parenthesis, character))
      cursor++
      continue
    }

    /** should ignore whitespace completely*/
    if (isWhitespace(character)) {
      cursor++
      continue
    }

    /** should tokenize digits */
    if (isNumber(character)) {
      let number = character
      while (input[++cursor] && isNumber(input[cursor])) {
        number += input[cursor]
      }
      tokens.push(buildToken(Type.number, Number.parseInt(number, 10)))
      continue
    }

    /** should tokenize letters */
    if (isLetter(character)) {
      let symbol = character

      while (input[++cursor] && isLetter(input[cursor])) {
        symbol += input[cursor]
      }

      tokens.push(buildToken(Type.name, symbol))
      continue
    }

    /** should tokenize strings */
    if (isQuote(character)) {
      let string = ''

      while (input[++cursor] && !isQuote(input[cursor])) {
        string += input[cursor]
      }
      tokens.push(buildToken(Type.string, string))

      cursor++
      continue
    }

    /** if case is not handled */
    throw new Error(`==> ${character} <== is not valid`)
  }
  return tokens //?
}
