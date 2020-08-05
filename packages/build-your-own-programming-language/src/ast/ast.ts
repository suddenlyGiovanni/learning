import * as AST from 'types'

export class Position implements AST.Position {
  public line: number
  public column: number

  constructor(line: number, column: number) {
    this.validateLine(line)
    this.validateColum(column)

    this.line = line
    this.column = column
  }

  private validateLine(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error('Error: the line is not an integer')
    }
    if (!(value >= 1)) {
      throw new Error('Error: the line is not 1-indexed')
    }
  }
  private validateColum(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error('Error: the column is not an integer')
    }
    if (!(value >= 0)) {
      throw new Error('Error: the column is not 0-indexed')
    }
  }
}

export class Identifier implements AST.Identifier {
  public type: AST.SyntaxKind.Identifier
  public name: string
  public loc: AST.SourceLocation | null
  constructor(value: string) {
    this.type = AST.SyntaxKind.Identifier
    this.name = value
    this.loc = null
  }

  public static isIdentifier(node: ASTNode): node is Identifier {
    return node.type === AST.SyntaxKind.Identifier
  }
}

export class NumericLiteral implements AST.Literal {
  public type: AST.SyntaxKind.NumericLiteral
  public value: number
  public loc: AST.SourceLocation | null
  constructor(value: number) {
    this.type = AST.SyntaxKind.NumericLiteral
    this.value = value
    this.loc = null
  }

  public static isNumericLiteral(node: ASTNode): node is NumericLiteral {
    return node.type === AST.SyntaxKind.NumericLiteral
  }
}

export class StringLiteral implements AST.Literal {
  public type: AST.SyntaxKind.StringLiteral
  public value: string
  public loc: AST.SourceLocation | null
  constructor(value: string) {
    this.type = AST.SyntaxKind.StringLiteral
    this.value = value
    this.loc = null
  }

  public static isStringLiteral(node: ASTNode): node is StringLiteral {
    return node.type === AST.SyntaxKind.StringLiteral
  }
}

export class CallExpression implements AST.CallExpression {
  public name: string
  public type: AST.SyntaxKind.CallExpression
  public loc?: AST.SourceLocation | null
  public arguments: AST.Expression[]
  public callee?: AST.Expression | null
  constructor(name: string, args: AST.Expression[]) {
    this.type = AST.SyntaxKind.CallExpression
    this.name = name
    this.loc = null
    this.arguments = args
    this.callee = null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isCallExpression(node: ASTNode): node is CallExpression {
    return node.type === AST.SyntaxKind.CallExpression
  }
}

export class VariableDeclaration implements AST.Expression {
  public type: AST.SyntaxKind.VariableDeclaration
  public identifier: AST.Identifier

  public assignment: AST.Literal

  constructor(identifier: AST.Identifier, assignment: AST.Literal) {
    this.type = AST.SyntaxKind.VariableDeclaration
    this.identifier = identifier
    this.assignment = assignment
  }

  public static isVariableDeclaration(
    node: ASTNode
  ): node is VariableDeclaration {
    return node.type === AST.SyntaxKind.VariableDeclaration
  }
}

export type ASTNode =
  | AST.Statement
  | AST.Expression
  | AST.Pattern
  | Identifier
  | AST.Literal
  | AST.Directive
  | AST.Program
  | AST.ExpressionStatement
  | AST.BlockStatement
  | AST.FunctionBody
  | AST.Function
  | CallExpression
  | NumericLiteral
  | StringLiteral
  | VariableDeclaration
