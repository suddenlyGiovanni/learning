/* eslint-disable no-useless-escape */
import {
  isLetter,
  isSpace,
  isTab,
  isWhitespace,
  isNumber,
  isOpeningParenthesis,
  isClosingParenthesis,
  isParenthesis,
  isQuote,
  isOperator,
  isLineTerminator,
} from './identify'

const characters = 'aa'
const character = 'a'
const number = '1'
const space = ' '
const tab = '\t'
const whitespace = '\t\n'
const carriageReturn = '\r'
const singleQuote = `\'`
const doubleQuote = `\"`
const openingParenthesis = '('
const closingParenthesis = ')'
const additionOperator = '+'
const subtractionOperator = '-'
const divisionOperator = '/'
const multiplicationOperator = '*'
const remainderOperator = '%'
// const exponentiationOperator = '**'
// const incrementOperator = '++'
// const decrementOperator = '--'
describe('isLetter', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isLetter(characters)
    expect(fn).toThrow()
  })
  it('happy path', () => {
    expect(isLetter(character)).toBe(true)
  })

  it('Should return `false` for a number', () => {
    expect(isLetter(number)).toBe(false)
  })

  it('Should return `false` for a space', () => {
    expect(isLetter(space)).toBe(false)
  })

  it('Should return `false` for a tab', () => {
    expect(isLetter(tab)).toBe(false)
  })
  it('Should return `false` for a new line', () => {
    expect(isLetter(carriageReturn)).toBe(false)
  })
  it('Should return `false` for a single quote', () => {
    expect(isLetter(singleQuote)).toBe(false)
  })
  it('Should return `false` for a double quote', () => {
    expect(isLetter(doubleQuote)).toBe(false)
  })
})

describe('isSpace', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isSpace(characters)
    expect(fn).toThrow()
  })

  it('happy path', () => {
    expect(isSpace(space)).toBe(true)
  })

  it('Should return `false` for a tab', () => {
    expect(isSpace(tab)).toBe(false)
  })
})

describe('isTab', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isTab(characters)
    expect(fn).toThrow()
  })

  it('happy path', () => {
    expect(isTab(tab)).toBe(true)
  })

  it('Should return `false` for a whitespace', () => {
    expect(isTab(space)).toBe(false)
  })
})

describe('isWhitespace', () => {
  it('happy path', () => {
    expect(isWhitespace(whitespace)).toBe(true)
  })
})

describe('isLineTerminator', () => {
  it('happy path', () => {
    expect.hasAssertions()
    expect(isLineTerminator('\r')).toBe(true)
    expect(isLineTerminator('\n')).toBe(true)
  })
})
describe('isNumber', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isNumber('1000')
    expect(fn).toThrow()
  })

  test('happy path', () => {
    expect(isNumber(number)).toBe(true)
  })

  it('Should return `false` for not numbers', () => {
    expect(isNumber(character)).toBe(false)
  })
})

describe('isOpeningParenthesis', () => {
  // it.skip('accepts only a single character at a time', () => {
  //   const fn = (): boolean => isOpeningParenthesis(characters)
  //   expect(fn).toThrow()
  // })

  test('happy path', () => {
    expect(isOpeningParenthesis(openingParenthesis)).toBe(true)
  })
  test('Should return `false` for closing parenthesis', () => {
    expect(isOpeningParenthesis(closingParenthesis)).not.toBe(true)
  })
})

describe('isClosingParenthesis', () => {
  // it.skip('accepts only a single character at a time', () => {
  //   const fn = (): boolean => isClosingParenthesis(characters)
  //   expect(fn).toThrow()
  // })

  test('happy path', () => {
    expect(isClosingParenthesis(closingParenthesis)).toBe(true)
  })
  test('Should return `false` for closing parenthesis', () => {
    expect(isClosingParenthesis(openingParenthesis)).not.toBe(true)
  })
})

describe('isParenthesis', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isParenthesis(characters)
    expect(fn).toThrow()
  })
  test('happy path', () => {
    expect(isParenthesis(openingParenthesis)).toBe(true)
    expect(isParenthesis(closingParenthesis)).toBe(true)
  })
})

describe('isQuote', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isQuote(characters)
    expect(fn).toThrow()
  })

  test('happy path', () => {
    expect(isQuote(doubleQuote)).toBe(true)
  })

  test('Should return `false` for single quote', () => {
    expect(isQuote(singleQuote)).not.toBe(true)
  })
})

describe('isOperator', () => {
  it('accepts only a single character at a time', () => {
    const fn = (): boolean => isOperator(characters)
    expect(fn).toThrow()
  })

  describe('happy path', () => {
    test('addition operator', () => {
      expect(isOperator(additionOperator)).toBe(true)
    })
    test('subtraction operator', () => {
      expect(isOperator(subtractionOperator)).toBe(true)
    })
    test('division operator', () => {
      expect(isOperator(divisionOperator)).toBe(true)
    })
    test('multiplication operator', () => {
      expect(isOperator(multiplicationOperator)).toBe(true)
    })
    test('remainder operator', () => {
      expect(isOperator(remainderOperator)).toBe(true)
    })

    test.todo('exponentiation operator')

    test.todo('increment operator')

    test.todo('decrement operator')

    test.todo('unary negation operator')

    test.todo('unary plus operator')
  })
})
