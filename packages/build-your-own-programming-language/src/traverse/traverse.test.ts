import { traverse, Visitor } from './traverse'
import { CallExpression, NumericLiteral, ASTNode } from 'ast/ast'
import { SyntaxKind } from 'types'

describe(traverse, () => {
  it('should travel to all the nodes in the tree and reverse the math', () => {
    const ast: ASTNode = {
      type: SyntaxKind.CallExpression,
      name: 'add',
      arguments: [
        { type: SyntaxKind.NumericLiteral, value: 12 },
        { type: SyntaxKind.NumericLiteral, value: 6 },
      ],
    }

    const visitor: Visitor = {
      CallExpression: {
        enter({ node }): void {
          if (CallExpression.isCallExpression(node) && node.name === 'add') {
            node.name = 'subtract'
          }
        },
      },
      NumericLiteral: {
        exit({ node }): void {
          if (NumericLiteral.isNumericLiteral(node)) {
            node.value = node.value * 2
          }
        },
      },
    }

    traverse(ast, visitor)

    expect(ast.name).toBe('subtract')
  })

  it('should travel to all the nodes in the tree and double all of the numbers', () => {
    const ast: ASTNode = {
      type: SyntaxKind.CallExpression,
      name: 'add',
      arguments: [
        { type: SyntaxKind.NumericLiteral, value: 12 },
        { type: SyntaxKind.NumericLiteral, value: 6 },
      ],
    }

    const visitor: Visitor = {
      NumericLiteral: {
        exit({ node }): void {
          if (NumericLiteral.isNumericLiteral(node)) {
            node.value = node.value * 2
          }
        },
      },
    }

    traverse(ast, visitor)

    expect(ast.arguments[0].value).toBe(24)
    expect(ast.arguments[1].value).toBe(12)
  })

  it('should modify the tree', () => {
    const ast: ASTNode = {
      type: SyntaxKind.CallExpression,
      name: '+',
      arguments: [
        { type: SyntaxKind.NumericLiteral, value: 12 },
        { type: SyntaxKind.NumericLiteral, value: 6 },
      ],
    }

    const visitor: Visitor = {
      CallExpression: {
        enter({ node }): void {
          if ('name' in node && node.name === '+') {
            node.name = 'add'
          }
        },
      },
    }

    traverse(ast, visitor)

    expect(ast.name).toBe('add')
  })
})
