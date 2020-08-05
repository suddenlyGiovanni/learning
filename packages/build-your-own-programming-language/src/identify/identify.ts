const LETTER = /[a-zA-Z]/
const SPACE = / /
const TAB = /\t/
const WHITESPACE = /\s+/
const NUMBER = /^[0-9]+$/
const OPENING_PARENTHESIS = /\(/
const CLOSING_PARENTHESIS = /\)/
const DOUBLE_QUOTE = /"/
const OPERATORS = /(\+)|(-)|(\*)|(\/)|(%)/
const LINE_TERMINATOR = /(\r|\n)/

/**
 * a string compose of a single character
 */
type Character = string

/**
 * a string compose of a multiple character
 */
type Characters = string

function assertSingleCharacter(str: string): asserts str is Character {
  if (str.length > 1) {
    throw new Error('only accepts a single character at a time')
  }
}

function isLetter(character: Character): boolean {
  assertSingleCharacter(character)
  return LETTER.test(character)
}

function isSpace(character: Character): boolean {
  assertSingleCharacter(character)
  return SPACE.test(character)
}
/**
 *  Matches any whitespace character (spaces, tabs, line breaks)
 */
function isWhitespace(characters: Characters): boolean {
  return WHITESPACE.test(characters)
}

function isTab(character: Character): boolean {
  assertSingleCharacter(character)
  return TAB.test(character)
}

function isLineTerminator(character: Character): boolean {
  return LINE_TERMINATOR.test(character)
}

function isNumber(character: Character): boolean {
  assertSingleCharacter(character)
  return NUMBER.test(character)
}

function isOpeningParenthesis(character: Character): boolean {
  // assertSingleCharacter(character)
  return OPENING_PARENTHESIS.test(character)
}
function isClosingParenthesis(character: Character): boolean {
  // assertSingleCharacter(character)
  return CLOSING_PARENTHESIS.test(character)
}

function isParenthesis(character: Character): boolean {
  assertSingleCharacter(character)
  return isOpeningParenthesis(character) || isClosingParenthesis(character)
}

function isQuote(character: Character): boolean {
  assertSingleCharacter(character)
  return DOUBLE_QUOTE.test(character)
}

function isOperator(character: Character): boolean {
  assertSingleCharacter(character)
  return OPERATORS.test(character)
}

export {
  isLetter,
  isSpace,
  isTab,
  isWhitespace,
  isLineTerminator,
  isNumber,
  isOpeningParenthesis,
  isClosingParenthesis,
  isParenthesis,
  isQuote,
  isOperator,
}
