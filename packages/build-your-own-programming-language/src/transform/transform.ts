import { traverse, Visitor } from '../traverse/traverse'
import { ASTNode, CallExpression } from '../ast/ast'
import { specialForms } from '../special-forms/special-forms'
import { SpecialForms } from 'types'

const visitor: Visitor = {
  CallExpression: {
    enter({ node }): void {
      if (CallExpression.isCallExpression(node)) {
        if (specialForms[node.name as SpecialForms]) {
          specialForms[node.name as SpecialForms](node)
        }
      }
    },
  },
}
export function transform(node: ASTNode): ASTNode {
  traverse(node, visitor)

  return node
}
