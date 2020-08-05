import { evaluate } from './evaluate'
import { NumericLiteral, StringLiteral, CallExpression } from '../ast/ast'
import { SyntaxKind } from 'types'

describe(evaluate, () => {
  it('should fall back to returning a primitive numeric value', () => {
    const ast: NumericLiteral = {
      type: SyntaxKind.NumericLiteral,
      value: 2,
      loc: null,
    }

    expect(evaluate(ast)).toBe(2)
  })

  it('should fall back to returning a primitive string value', () => {
    const ast: StringLiteral = {
      type: SyntaxKind.StringLiteral,
      value: 'Hello',
      loc: null,
    }

    expect(evaluate(ast)).toBe('Hello')
  })

  it('should be able to evaluate a single expression', () => {
    const ast: CallExpression = {
      type: SyntaxKind.CallExpression,
      name: 'add',
      arguments: [
        { type: SyntaxKind.NumericLiteral, value: 2 } as NumericLiteral,
        { type: SyntaxKind.NumericLiteral, value: 3 } as NumericLiteral,
      ],
    }

    const result = evaluate(ast)

    expect(result).toBe(5)
  })

  it('should be able to evaluate a nested expression', () => {
    const ast = {
      type: SyntaxKind.CallExpression,
      name: 'add',
      arguments: [
        { type: SyntaxKind.NumericLiteral, value: 2 },
        { type: SyntaxKind.NumericLiteral, value: 3 },
        {
          type: SyntaxKind.CallExpression,
          name: 'subtract',
          arguments: [
            { type: SyntaxKind.NumericLiteral, value: 5 },
            { type: SyntaxKind.NumericLiteral, value: 4 },
          ],
        },
      ],
    }

    const result = evaluate(ast)

    expect(result).toBe(6)
  })

  it('should be able to lookup identifiers in the environment', () => {
    const ast = { type: 'Identifier', name: 'pi' }
    expect(evaluate(ast)).toBe(Math.PI)
  })

  it('should be able to highest number in a range', () => {
    const ast = {
      type: 'CallExpression',
      name: 'max',
      arguments: [
        { type: 'NumericLiteral', value: 2 },
        { type: 'NumericLiteral', value: 3 },
        { type: 'NumericLiteral', value: 10 },
      ],
    }

    expect(evaluate(ast)).toBe(10)
  })
})
