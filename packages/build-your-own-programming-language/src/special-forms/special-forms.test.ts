import { specialForms } from './special-forms'
import { CallExpression, VariableDeclaration } from 'ast/ast'
import { SyntaxKind, SpecialForms } from '../types/index'

describe('specialForms', () => {
  describe('define', () => {
    it('should transform a call expression into a variable declaration', () => {
      const callExpression: CallExpression = {
        type: SyntaxKind.CallExpression,
        name: SpecialForms.define,
        arguments: [
          { type: SyntaxKind.Identifier, name: 'x' },
          { type: SyntaxKind.NumericLiteral, value: 3 },
        ],
      }

      const temp = () => specialForms.define(callExpression)

      const variableDeclaration: VariableDeclaration = {
        type: SyntaxKind.VariableDeclaration,
        identifier: { type: SyntaxKind.Identifier, name: 'x' },
        assignment: { type: SyntaxKind.NumericLiteral, value: 3 },
      }

      expect(callExpression).toBe(callExpression)
      temp()
      expect(callExpression).toEqual(variableDeclaration)
    })
  })
})
