import { toJavaScript } from './to-javascript'
import { SyntaxKind } from 'types'

describe(toJavaScript, () => {
  it('should reformate Dropbear to valid JavaScript', () => {
    /**
     * ast for
     * @example
     * (add 2 3 (subtract 5 4))
     */
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
            { type: 'NumericLiteral', value: 5 },
            { type: 'NumericLiteral', value: 4 },
          ],
        },
      ],
    }

    expect(toJavaScript(ast)).toBe('add(2, 3, subtract(5, 4))')
  })

  it('should support variables', () => {
    const ast = {
      type: SyntaxKind.VariableDeclaration,
      identifier: { type: SyntaxKind.Identifier, name: 'x' },
      assignment: { type: SyntaxKind.NumericLiteral, value: 3 },
    }

    expect(toJavaScript(ast)).toBe('let x = 3;')
  })
})
