import assert from 'assert'
import { isBalanced } from './05-stack-bracket-validator'

// Tests

export const main = (): void => {
  const balancedExpression = '[()]{}{[()()]()}'
  const unbalancedExpression = '[(])'
  /*
   *  Test cases:
   * Input: exp = '[()]{}{[()()]()}'
   * Output: Balanced
   */
  assert.strictEqual(isBalanced(balancedExpression), true)

  /*
   * Input: exp = '[(])'
   * Output: Not Balanced
   */
  assert.strictEqual(isBalanced(unbalancedExpression), false)
}
