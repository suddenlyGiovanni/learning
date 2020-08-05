import { tokenize } from './tokenize'
import { Token } from './token'

describe(tokenize, () => {
  it('should return an array', () => {
    expect(Array.isArray(tokenize(''))).toBe(true)
  })

  it('should be able to tokenize a pair of parentheses', () => {
    const input = '()'
    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })

  it('should ignore whitespace completely', () => {
    const input = '                  '
    const result: Token[] = []

    expect(tokenize(input)).toEqual(result)
  })

  // Exercise 1 - Begin
  it('should correctly tokenize a single digit', () => {
    const input = '2'
    const result = [{ type: 'Number', value: 2, loc: null }]

    expect(tokenize(input)).toEqual(result)
  })

  it('should be able to handle single numbers in expressions', () => {
    const input = '(1 2)'

    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Number', value: 1, loc: null },
      { type: 'Number', value: 2, loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })

  it('should be able to handle single letters in expressions', () => {
    const input = '(a b)'

    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Name', value: 'a', loc: null },
      { type: 'Name', value: 'b', loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })

  it('should be able to handle multiple-digit numbers', () => {
    const input = '(11 22)'

    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Number', value: 11, loc: null },
      { type: 'Number', value: 22, loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })

  // Exercise 2 Begin
  it('should correctly tokenize a simple expression', () => {
    const input = '(add 2 3)'
    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Name', value: 'add', loc: null },
      { type: 'Number', value: 2, loc: null },
      { type: 'Number', value: 3, loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })

  it('should ignore whitespace', () => {
    const input = '   (add    2 3)'
    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Name', value: 'add', loc: null },
      { type: 'Number', value: 2, loc: null },
      { type: 'Number', value: 3, loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })
  // Exercise 2 End

  it('should know about strings', () => {
    const input = '(log "hello" "world")'
    const result = [
      { type: 'Parenthesis', value: '(', loc: null },
      { type: 'Name', value: 'log', loc: null },
      { type: 'String', value: 'hello', loc: null },
      { type: 'String', value: 'world', loc: null },
      { type: 'Parenthesis', value: ')', loc: null },
    ]

    expect(tokenize(input)).toEqual(result)
  })
})
