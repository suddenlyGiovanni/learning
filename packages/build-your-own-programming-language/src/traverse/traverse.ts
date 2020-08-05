/* eslint-disable @typescript-eslint/no-use-before-define */
import { ASTNode, CallExpression } from '../ast/ast'
import { Expression, SyntaxKind } from 'types'

export type Visitor = {
  [PropertyKey in SyntaxKind]?: {
    enter?: (payload: { node: ASTNode; parent: ASTNode | null }) => unknown
    exit?: (payload: { node: ASTNode; parent: ASTNode | null }) => unknown
  }
}

function traverseArray({
  array,
  parent,
  visitor,
}: {
  array: Expression[]
  parent: ASTNode
  visitor: Visitor
}): void {
  array.forEach(node => traverseNode({ node, parent, visitor }))
}

function traverseNode({
  node,
  visitor,
  parent = null,
}: {
  visitor: Visitor
  node: ASTNode
  parent?: ASTNode | null
}): void {
  const methods = visitor[node.type]

  if (typeof methods !== 'undefined' && methods.enter) {
    methods.enter({ node, parent })
  }

  if (CallExpression.isCallExpression(node)) {
    traverseArray({ array: node.arguments, parent: node, visitor })
  }

  if (typeof methods !== 'undefined' && methods.exit) {
    methods.exit({ node, parent })
  }
}

export function traverse(node: ASTNode, visitor: Visitor): void {
  traverseNode({ node, visitor })
}
