import { CallExpression, VariableDeclaration, Identifier } from '../ast/ast'
import { Literal, SpecialForms } from 'types'

function TransformCallExpressionToVariableDeclaration(
  node: CallExpression
): VariableDeclaration {
  const [identifier, assignment] = node.arguments
  return new VariableDeclaration(
    identifier as Identifier,
    assignment as Literal
  )
}

/**
 * CallExpression
 *  - name (define)
 *  - arguments (identifier, assignment)
 *
 * converted to VariableDeclaration
 */
export const specialForms: { [methodName in SpecialForms]: any } = {
  define(node: CallExpression): void {
    const variableDeclarationNode = TransformCallExpressionToVariableDeclaration(
      node
    )

    delete node.name
    delete node.arguments

    Object.assign(node, variableDeclarationNode)
  },
}
