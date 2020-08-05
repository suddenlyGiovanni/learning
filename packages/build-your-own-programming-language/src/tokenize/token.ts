/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-dupe-class-members */
export enum Type {
  parenthesis = 'Parenthesis',
  number = 'Number',
  name = 'Name',
  string = 'String',
}

export type Value = string | number
export interface Position {
  line: number // >= 1
  column: number // >= 0
}

export interface SourceLocation {
  start: Position
  end: Position
}

interface BaseToken<T extends Type, V extends Value> {
  type: T
  value: V
  loc: null | SourceLocation
}

interface ParenthesisToken extends BaseToken<Type.parenthesis, string> {}

interface NumberToken extends BaseToken<Type.number, number> {}

interface NameToken extends BaseToken<Type.name, string> {}
interface StringToken extends BaseToken<Type.string, string> {}

export type Token = ParenthesisToken | NumberToken | NameToken | StringToken

export function buildToken(
  type: Type.parenthesis,
  value: string,
  loc?: null | SourceLocation
): ParenthesisToken
export function buildToken(
  type: Type.number,
  value: number,
  loc?: null | SourceLocation
): NumberToken
export function buildToken(
  type: Type.name,
  value: string,
  loc?: null | SourceLocation
): NameToken
export function buildToken(
  type: Type.string,
  value: string,
  loc?: null | SourceLocation
): StringToken
export function buildToken<T extends Type, V extends Value>(
  type: T,
  value: V,
  loc: null | SourceLocation = null
): BaseToken<T, V> {
  return { type, value, loc }
}

export function isParenthesisToken(token: Token): token is ParenthesisToken {
  return token.type === Type.parenthesis
}
export function isNumberToken(token: Token): token is NumberToken {
  return token.type === Type.number
}
export function isNameToken(token: Token): token is NameToken {
  return token.type === Type.name
}
export function isStringToken(token: Token): token is StringToken {
  return token.type === Type.string
}
