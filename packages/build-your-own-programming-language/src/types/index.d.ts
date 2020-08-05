/* eslint-disable @typescript-eslint/no-empty-interface */
export const enum SyntaxKind {
  Identifier = 'Identifier',
  Literal = 'Literal',
  NumericLiteral = 'NumericLiteral',
  StringLiteral = 'StringLiteral',
  ExpressionStatement = 'ExpressionStatement',
  Program = 'Program',
  BlockStatement = 'BlockStatement',
  CallExpression = 'CallExpression',
  VariableDeclaration = 'VariableDeclaration',
  VariableDeclarator = 'VariableDeclarator',
}

export const enum SyntaxToken {
  OpenBraceToken,
  CloseBrace,
  OpenParen,
  CloseParen,
  OpenBracket,
  CloseBracket,
  Dot,
  DotDotDot,
  Semicolon,
  Comma,
  QuestionDot,
  LessThan,
  LessThanSlash,
  GreaterThan,
  LessThanEquals,
  GreaterThanEquals,
  EqualsEquals,
  ExclamationEquals,
  EqualsEqualsEquals,
  ExclamationEqualsEquals,
  EqualsGreaterThan,
  Plus,
  Minus,
  Asterisk,
  AsteriskAsterisk,
  Slash,
  Percent,
  PlusPlus,
  MinusMinus,
  LessThanLessThan,
  GreaterThanGreaterThan,
  GreaterThanGreaterThanGreaterThan,
  Ampersand,
  Bar,
  Caret,
  Exclamation,
  Tilde,
  AmpersandAmpersand,
  BarBar,
  Question,
  Colon,
  At,
  Backtick,
  // Assignments
  Equals,
  PlusEquals,
  MinusEquals,
  AsteriskEquals,
  AsteriskAsteriskEquals,
  SlashEquals,
  PercentEquals,
  LessThanLessThanEquals,
  GreaterThanGreaterThanEquals,
  GreaterThanGreaterThanGreaterThanEquals,
  AmpersandEquals,
  BarEquals,
  CaretEquals,
}

export const enum SpecialForms {
  define = 'define',
}

/**
 * object consisting of
 * - a `start` position (the position of the first character of the parsed source region) and
 * - an `end` position (the position of the first character after the parsed source region)
 */
export interface SourceLocation {
  source: string | null
  start: Position
  end: Position
}

/**
 * Each Position object consists of
 * - a `line` number (1-indexed) and
 * - a `column` number (0-indexed)
 */
export interface Position {
  line: number // >= 1
  column: number // >= 0
}

/**
 * ESTree AST nodes are represented as Node objects,
 * which may have any prototype inheritance but which implement the following interface:
 */

export interface Node {
  type: SyntaxKind
  // Parent node
  parent?: Node

  loc?: null | SourceLocation
}

/**
 * object consisting of
 * - a `start` position (the position of the first character of the parsed source region) and
 * - an `end` position (the position of the first character after the parsed source region)
 */
export interface SourceLocation {
  source: string | null
  start: Position
  end: Position
}

/**
 * Each Position object consists of
 * - a `line` number (1-indexed) and
 * - a `column` number (0-indexed)
 */
export interface Position {
  line: number // >= 1
  column: number // >= 0
}

/** Any statement. */
export interface Statement extends Node {}

/**
 * Any expression node
 */
export interface Expression extends Node {}

export interface Pattern extends Node {}

/** An identifier. Note that an identifier may be an expression or a destructuring pattern. */
export interface Identifier<Name extends string = string>
  extends Expression,
    Pattern {
  type: SyntaxKind.Identifier
  name: Name
}

/** A literal token. Note that a literal can be an expression. */
export interface Literal extends Expression {
  type:
    | SyntaxKind.Literal
    | SyntaxKind.NumericLiteral
    | SyntaxKind.StringLiteral
  value: string | boolean | null | number | RegExp
}

export type Declaration = Statement

/**
 * A directive from the directive prologue of a script or function.
 * The directive property is the raw string source of the directive without quotes.
 */
export interface Directive extends Node {
  type: SyntaxKind.ExpressionStatement
  expression: Literal
  directive: string
}

/** A complete program source tree. */

export interface Program extends Node {
  type: SyntaxKind.Program
  body: (Directive | Statement)[]
}

/** An expression statement, i.e., a statement consisting of a single expression. */
export interface ExpressionStatement extends Statement {
  type: SyntaxKind.ExpressionStatement
  expression: Expression
}

/** A block statement, i.e., a sequence of statements surrounded by braces. */
export interface BlockStatement extends Statement {
  type: SyntaxKind.BlockStatement
  body: Statement[]
}

/** The body of a function, which is a block statement that may begin with directives. */
export interface FunctionBody extends BlockStatement {
  body: (Directive | Statement)[]
}

/** A function declaration or expression. */
export interface Function extends Node {
  id: Identifier | null
  params: Pattern[]
  body: FunctionBody
}

/** A function or method call expression. */
export interface CallExpression extends Expression {
  // TODO: Remove null from callee def.
  callee?: Expression | null
  type: SyntaxKind.CallExpression
  arguments: Expression[]
}

/** A variable declaration. */
export interface VariableDeclaration extends Declaration {
  type: SyntaxKind.VariableDeclaration
  declarations: VariableDeclarator[]
  kind: 'var' | 'let' | 'const'
}

/** A variable declarator. */
export interface VariableDeclarator extends Node {
  type: SyntaxKind.VariableDeclarator
  id: Pattern
  init: Expression | null
}
