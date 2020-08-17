/**
 * Function properties:
 *  a) associative
 *  b) commutative
 *  c) identity
 *  d) distributive
 */

function add(x: number, y: number): number {
  return x + y
}

function multiply(x: number, y: number): number {
  return x * y
}

const x = 1
const y = 3
const z = 7

/**
 * ASSOCIATIVE
 * Within an expression containing two or more occurrences in a row of the same associative
 * operator, the order in which the operations are performed does not matter as long as the sequence
 * of the operands is not changed.
 * That is, (after rewriting the expression with parentheses and in infix notation if necessary)
 * rearranging the parentheses in such an expression will not change its value.
 * Consider the following equations:
 * @example
 *        ( 2 + 3 ) + 4  ===  2 + ( 3 + 4 ) = 9
 *        2 * (3 * 4)   ===   (2 * 3) * 4 = 24
 */
add(add(x, y), z) === add(x, add(y, z)) // true

/**
 * COMMUTATIVE
 * a binary operation is commutative if changing the order of the operands does not change the result
 * @example
 *      3 + 4 === 4 + 3
 *      2 * 5 = 5 * 2
 * stuff...
 */
add(x, y) === add(y, x) // true

/**
 * IDENTITY
 * stuff...
 */
add(x, 0) === x // true

/**
 * DISTRIBUTIVE
 * stuff...
 */
add(multiply(x, y), multiply(x, z)) === multiply(x, add(y, z)) //?
