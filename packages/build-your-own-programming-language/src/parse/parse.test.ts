import p from './parse'
import { Token, Type } from '../tokenize/token'

describe('parenthesize', () => {
  it('should not return opening and closing parenthesis token', () => {
    expect.hasAssertions()

    const tokens: Token[] = [
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
    ]

    const result = p.parenthesize(tokens)

    expect(result).toStrictEqual([])
  })
  it('should return a flat array of tokens for a basic data structure', () => {
    expect.hasAssertions()

    const tokens: Token[] = [
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.name, value: 'add', loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.number, value: 3, loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
    ]

    const result = p.parenthesize(tokens)

    expect(result).toStrictEqual([
      { type: Type.name, value: 'add', loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.number, value: 3, loc: null },
    ])
  })
  it('should return return a multi-dimensional array for a nested data structure', () => {
    expect.hasAssertions()

    const tokens: Token[] = [
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.name, value: 'add', loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.number, value: 3, loc: null },
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.name, value: 'subtract', loc: null },
      { type: Type.number, value: 4, loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
    ]

    const result = p.parenthesize(tokens)

    expect(result).toStrictEqual([
      { type: 'Name', value: 'add', loc: null },
      { type: 'Number', value: 2, loc: null },
      { type: 'Number', value: 3, loc: null },
      [
        { type: 'Name', value: 'subtract', loc: null },
        { type: 'Number', value: 4, loc: null },
        { type: 'Number', value: 2, loc: null },
      ],
    ])
  })
})

describe('parse', () => {
  it('should return a token with the type of NumericLiteral for number tokens', () => {
    expect.hasAssertions()

    const tokens: Token[] = [{ type: Type.number, value: 2, loc: null }]

    const ast = { type: 'NumericLiteral', value: 2, loc: null }

    expect(p.parse(tokens)).toEqual(ast)
  })

  it('should return a token with the type of StringLiteral for string tokens', () => {
    expect.hasAssertions()

    const tokens: Token[] = [{ type: Type.string, value: 'hello', loc: null }]

    const ast = { type: 'StringLiteral', value: 'hello', loc: null }

    expect(p.parse(tokens)).toEqual(ast)
  })

  it('should return a token with the type of Identifier for name tokens', () => {
    expect.hasAssertions()
    const tokens: Token[] = [{ type: Type.name, value: 'x', loc: null }]

    const ast = { type: 'Identifier', name: 'x', loc: null }

    expect(p.parse(tokens)).toEqual(ast)
  })

  it('should return an AST for a basic data structure', () => {
    const tokens: Token[] = [
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.name, value: 'add', loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.number, value: 3, loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
    ]

    const ast = {
      type: 'CallExpression',
      name: 'add',
      loc: null,
      callee: null,
      arguments: [
        { type: 'NumericLiteral', value: 2, loc: null },
        { type: 'NumericLiteral', value: 3, loc: null },
      ],
    }

    const result = p.parse(tokens)

    expect(result).toEqual(ast)
  })

  it('should return an AST for a nested data structure', () => {
    const tokens: Token[] = [
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.name, value: 'add', loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.number, value: 3, loc: null },
      { type: Type.parenthesis, value: '(', loc: null },
      { type: Type.name, value: 'subtract', loc: null },
      { type: Type.number, value: 4, loc: null },
      { type: Type.number, value: 2, loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
      { type: Type.parenthesis, value: ')', loc: null },
    ]

    const ast = {
      type: 'CallExpression',
      name: 'add',
      loc: null,
      callee: null,
      arguments: [
        { type: 'NumericLiteral', value: 2, loc: null },
        { type: 'NumericLiteral', value: 3, loc: null },
        {
          type: 'CallExpression',
          name: 'subtract',
          loc: null,
          callee: null,
          arguments: [
            { type: 'NumericLiteral', value: 4, loc: null },
            { type: 'NumericLiteral', value: 2, loc: null },
          ],
        },
      ],
    }

    const result = p.parse(tokens)

    expect(result).toEqual(ast)
  })
})
