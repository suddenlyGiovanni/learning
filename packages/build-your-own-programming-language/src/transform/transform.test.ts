import { transform } from './transform'
import { CallExpression, VariableDeclaration } from 'ast/ast'
import { SyntaxKind, SpecialForms } from '../types/index'

describe(transform, () => {
  it('should transform a "define" function to a variable declaration', () => {
    const callExpression: CallExpression = {
      type: SyntaxKind.CallExpression,
      name: SpecialForms.define,
      arguments: [
        { type: SyntaxKind.Identifier, name: 'x' },
        { type: SyntaxKind.NumericLiteral, value: 3 },
      ],
    }

    const variableDeclaration: VariableDeclaration = {
      type: SyntaxKind.VariableDeclaration,
      identifier: { type: SyntaxKind.Identifier, name: 'x' },
      assignment: { type: SyntaxKind.NumericLiteral, value: 3 },
    }

    expect(transform(callExpression)).toEqual(variableDeclaration)
  })
})
