/*
  eslint-disable
  capitalized-comments,
  multiline-comment-style,
  init-declarations,
  jest/no-hooks,
  jest/require-top-level-describe,
  jest/no-disabled-tests,
  @typescript-eslint/unbound-method,
  no-magic-numbers,
  max-statements,
  max-lines-per-function
*/

import type { IBinaryTree } from '../interfaces/binary-tree.interface'
import { ILogger, Logger } from '../utils/logger'

import { BinaryTree, countLeaf } from './binary-trees'

let binaryTree: IBinaryTree<number>
let logger: ILogger

beforeEach(() => {
  binaryTree = new BinaryTree(1)
})

test('it should be a function', () => {
  expect.hasAssertions()
  expect(typeof BinaryTree).toBe('function')
})

test('should have a left and right property', () => {
  expect.assertions(2)
  // eslint-disable-next-line no-prototype-builtins
  expect(binaryTree.hasOwnProperty('_left')).toBe(true)
  // eslint-disable-next-line no-prototype-builtins
  expect(binaryTree.hasOwnProperty('_right')).toBe(true)
})

describe('the `insertChild` function', () => {
  afterEach(() => {
    binaryTree.left = null
    binaryTree.right = null
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binaryTree.insertChild).toBe('function')
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  it('the child should be a BinaryTree instance', () => {
    expect.hasAssertions()
    binaryTree.insertChild(2)
    binaryTree.insertChild(3)

    expect(binaryTree.left).toBeInstanceOf(BinaryTree)
    expect(binaryTree.right).toBeInstanceOf(BinaryTree)
  })

  it('should insert children in a level order', () => {
    expect.hasAssertions()

    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    binaryTree.insertChild(6)
    binaryTree.insertChild(7)

    expect(binaryTree.left?.value).toBe(2)
    expect(binaryTree.right?.value).toBe(3)
    expect(binaryTree.left?.left?.value).toBe(4)
    expect(binaryTree.left?.right?.value).toBe(5)
    expect(binaryTree.right?.left?.value).toBe(6)
    expect(binaryTree.right?.right?.value).toBe(7)
  })
})

describe('the `inOrderTraversal` function', () => {
  beforeEach(() => {
    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    binaryTree.insertChild(6)
    binaryTree.insertChild(7)

    logger = new Logger()
  })

  afterEach(() => {
    binaryTree.left = null
    binaryTree.right = null
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binaryTree.inOrderTraversal).toBe('function')
  })

  it('should visit all nodes in an in-order (left, root, right) pattern', () => {
    expect.hasAssertions()
    binaryTree.inOrderTraversal(logger.log)

    // Extract the values out of the logger
    const values = (logger as ILogger<IBinaryTree<number>>).values.map(
      (currentBinaryTree) => currentBinaryTree.value
    )

    expect(values).toStrictEqual([4, 2, 5, 1, 6, 3, 7])
  })
})

describe('the `preOrderTraversal` function', () => {
  beforeEach(() => {
    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    binaryTree.insertChild(6)
    binaryTree.insertChild(7)

    logger = new Logger<IBinaryTree<number>>()
  })

  afterEach(() => {
    binaryTree.left = null
    binaryTree.right = null
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binaryTree.preOrderTraversal).toBe('function')
  })

  it('should visit all nodes in an pre-order (root, left, right) pattern', () => {
    expect.hasAssertions()
    binaryTree.preOrderTraversal(logger.log)

    const valueLense = <T>(x: { value: T }): T => x.value
    // Extract the values out of the logger
    const values = (logger as ILogger<IBinaryTree<number>>).values.map(
      valueLense
    )

    expect(values).toStrictEqual([1, 2, 4, 5, 3, 6, 7])
  })
})

describe('the `postOrderTraversal` function', () => {
  beforeEach(() => {
    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    binaryTree.insertChild(6)
    binaryTree.insertChild(7)

    logger = new Logger()
  })

  afterEach(() => {
    binaryTree.left = null
    binaryTree.right = null
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binaryTree.postOrderTraversal).toBe('function')
  })

  it('should visit all nodes in an post-order (left, right, root) pattern', () => {
    expect.hasAssertions()
    binaryTree.postOrderTraversal(logger.log)

    // Extract the values out of the logger
    const values = (logger as ILogger<IBinaryTree<number>>).values.map(
      (currentBinaryTree) => currentBinaryTree.value
    )

    expect(values).toStrictEqual([4, 5, 2, 6, 7, 3, 1])
  })
})

describe('the `contain` function', () => {
  beforeEach(() => {
    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    binaryTree.insertChild(6)
    binaryTree.insertChild(7)

    logger = new Logger<IBinaryTree<number>>()
  })

  afterEach(() => {
    binaryTree.left = null
    binaryTree.right = null
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binaryTree.contains).toBe('function')
  })

  it('should return true if a node contains the given value', () => {
    expect.hasAssertions()
    expect(binaryTree.contains(1)).toBe(true)
    expect(binaryTree.contains(2)).toBe(true)
    expect(binaryTree.contains(3)).toBe(true)
    expect(binaryTree.contains(4)).toBe(true)
    expect(binaryTree.contains(5)).toBe(true)
    expect(binaryTree.contains(6)).toBe(true)
    expect(binaryTree.contains(7)).toBe(true)
  })

  it('should return false if no node matches the given value', () => {
    expect.hasAssertions()
    expect(binaryTree.contains(0)).toBe(false)
    expect(binaryTree.contains(100)).toBe(false)
  })
})

describe('the `countLeafs` function', () => {
  afterEach(() => {
    binaryTree.left = null
    binaryTree.right = null
  })
  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof countLeaf).toBe('function')
  })

  it('should return the correct number of leaf nodes - 1', () => {
    expect.hasAssertions()
    expect(countLeaf(binaryTree)).toBe(1)

    binaryTree.insertChild(2)
    expect(countLeaf(binaryTree)).toBe(1)
  })

  it('should return the correct number of leaf nodes - 2', () => {
    expect.hasAssertions()

    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    expect(countLeaf(binaryTree)).toBe(2)

    binaryTree.insertChild(4)
    expect(countLeaf(binaryTree)).toBe(2)
  })
  it('should return the correct number of leaf nodes - 3', () => {
    expect.hasAssertions()

    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    expect(countLeaf(binaryTree)).toBe(3)

    binaryTree.insertChild(6)
    expect(countLeaf(binaryTree)).toBe(3)
  })

  it('should return the correct number of leaf nodes - 4', () => {
    expect.hasAssertions()

    binaryTree.insertChild(2)
    binaryTree.insertChild(3)
    binaryTree.insertChild(4)
    binaryTree.insertChild(5)
    binaryTree.insertChild(6)
    binaryTree.insertChild(7)

    expect(countLeaf(binaryTree)).toBe(4)
  })
})
