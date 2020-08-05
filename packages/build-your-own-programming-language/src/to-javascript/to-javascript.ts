import generate from '@babel/generator'
import { Node } from '@babel/types'

import { traverse, Visitor } from 'traverse/traverse'
import {
  ASTNode,
  CallExpression,
  Identifier,
  VariableDeclaration,
} from 'ast/ast'
import {
  SyntaxKind,
  VariableDeclaration as BabelVariableDeclaration,
} from 'types'

const babelVisitor: Visitor = {
  CallExpression: {
    enter({ node }): void {
      if (CallExpression.isCallExpression(node)) {
        const identifier: Identifier = {
          type: SyntaxKind.Identifier,
          name: node.name,
          loc: null,
        }
        node.callee = identifier
      }
    },
  },

  VariableDeclaration: {
    enter({ node }): void {
      if (VariableDeclaration.isVariableDeclaration(node)) {
        const { assignment, identifier } = node

        const babelVariableDeclaration: BabelVariableDeclaration = {
          kind: 'let',
          type: SyntaxKind.VariableDeclaration,
          declarations: [
            {
              type: SyntaxKind.VariableDeclarator,
              id: identifier,
              init: assignment,
            },
          ],
        }

        delete node.assignment
        delete node.identifier

        Object.assign(node, babelVariableDeclaration) //?
      }
    },
  },
}

export const toJavaScript = (ast: ASTNode): string => {
  traverse(ast, babelVisitor)
  return generate(ast as Node).code
}
