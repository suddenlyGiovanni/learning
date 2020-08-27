/*
  eslint-disable
  @typescript-eslint/no-non-null-assertion,
  init-declarations,
  jest/no-hooks,
  jest/require-top-level-describe,
  max-statements,
  jest/require-top-level-describe
*/

import { ILogger, Logger } from '../utils/logger'

import { BinarySearchTree, Node } from './binary-search-trees'

import type { IBinarySearchTree } from './binary-search-trees.interface'

let binarySearchTree: IBinarySearchTree<number>
let logger: ILogger<IBinarySearchTree<number>>

beforeEach(() => {
  binarySearchTree = new BinarySearchTree<number>()
})

test('it should be a function', () => {
  expect.hasAssertions()
  expect(typeof BinarySearchTree).toBe('function')
})

test('should have a root property', () => {
  expect.hasAssertions()
  // eslint-disable-next-line no-prototype-builtins
  expect(binarySearchTree.hasOwnProperty('root')).toBe(true)
})

describe('the insert function', () => {
  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binarySearchTree.insert).toBe('function')
  })

  it('the child should be a Node instance', () => {
    expect.hasAssertions()
    binarySearchTree.insert(2)
    binarySearchTree.insert(4)

    expect(binarySearchTree.root?.right).toBeInstanceOf(Node)
  })

  it('should insert in a manner consistent with that of a binary search tree', () => {
    expect.hasAssertions()
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.insert(5)
    binarySearchTree.insert(7)

    expect(binarySearchTree.root?.value).toBe(4)
    expect(binarySearchTree.root?.left?.value).toBe(2)
    expect(binarySearchTree.root?.right?.value).toBe(6)
    expect(binarySearchTree.root?.left?.left?.value).toBe(1)
    expect(binarySearchTree.root?.left?.right?.value).toBe(3)
    expect(binarySearchTree.root?.right?.left?.value).toBe(5)
    expect(binarySearchTree.root?.right?.right?.value).toBe(7)
  })
})

describe('the contains function', () => {
  beforeEach(() => {
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(5)
    binarySearchTree.insert(3)
    binarySearchTree.insert(15)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binarySearchTree.contains).toBe('function')
  })

  it('should return true when the tree contains the value', () => {
    expect.hasAssertions()
    expect(binarySearchTree.contains(4)).toBe(true)
    expect(binarySearchTree.contains(2)).toBe(true)
    expect(binarySearchTree.contains(6)).toBe(true)
    expect(binarySearchTree.contains(1)).toBe(true)
    expect(binarySearchTree.contains(5)).toBe(true)
    expect(binarySearchTree.contains(3)).toBe(true)
    expect(binarySearchTree.contains(15)).toBe(true)
  })

  it('should return false when the tree does not contain the value', () => {
    expect.hasAssertions()
    expect(binarySearchTree.contains(4.1)).toBe(false)
    expect(binarySearchTree.contains(11)).toBe(false)
  })
})

describe('the min function', () => {
  beforeEach(() => {
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.insert(5)
    binarySearchTree.insert(7)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binarySearchTree.min).toBe('function')
  })

  it('should return the node containing the minimum value', () => {
    expect.hasAssertions()
    expect(binarySearchTree.min(binarySearchTree.root)).toStrictEqual(
      new Node(1)
    )
    expect(binarySearchTree.min(binarySearchTree.root!.right)).toStrictEqual(
      new Node(5)
    )
  })
})

describe('the max function', () => {
  beforeEach(() => {
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.insert(5)
    binarySearchTree.insert(7)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binarySearchTree.max).toBe('function')
  })

  it('should return the node containing the maximum value', () => {
    expect.hasAssertions()
    expect(binarySearchTree.max(binarySearchTree.root)).toStrictEqual(new Node(7))
    expect(binarySearchTree.max(binarySearchTree.root!.left)).toStrictEqual(
      new Node(3)
    )
  })
})

describe.skip('the remove function', () => {
  beforeEach(() => {
    binarySearchTree = new BinarySearchTree()
  })
  it('should be a function', () => {
    expect(typeof binarySearchTree.remove).toBe('function')
  })

  it('should remove the node with the given value when it has no children', () => {
    expect.hasAssertions()
    binarySearchTree.insert(2)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.remove(1)

    expect(binarySearchTree.root.value).toBe(2)
    expect(binarySearchTree.root.left).toBeNull()
    expect(binarySearchTree.root.right.value).toBe(3)
  })

  it('should remove the node with the given value and promote its child when it has one child', () => {
    expect.hasAssertions()
    binarySearchTree.insert(2)
    binarySearchTree.insert(1)
    binarySearchTree.insert(0.5)
    binarySearchTree.insert(3)
    binarySearchTree.remove(1)

    expect(binarySearchTree.root.value).toBe(2)
    expect(binarySearchTree.root.left.value).toBe(0.5)
    expect(binarySearchTree.root.right.value).toBe(3)
  })

  it('should remove the node with the given value and promote its successor when it has two children', () => {
    expect.hasAssertions()
    binarySearchTree.insert(2)
    binarySearchTree.insert(1)
    binarySearchTree.insert(0.5)
    binarySearchTree.insert(1.5)
    binarySearchTree.insert(3)
    binarySearchTree.remove(1)

    expect(binarySearchTree.root.value).toBe(2)
    expect(binarySearchTree.root.left.value).toBe(1.5)
    expect(binarySearchTree.root.left.left.value).toBe(0.5)
    expect(binarySearchTree.root.right.value).toBe(3)
  })
})

describe.skip('the inOrderTraversal function', () => {
  beforeEach(() => {
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.insert(5)
    binarySearchTree.insert(7)

    logger = new Logger()
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binarySearchTree.inOrderTraversal).toBe('function')
  })

  it('should visit all nodes in an in-order (left, root, right) pattern', () => {
    expect.hasAssertions()
    binarySearchTree.inOrderTraversal(binarySearchTree.root, logger.log)

    // Extract the values out of the logger
    const values = logger.values.map(
      (currentBinaryTree) => currentBinaryTree.value
    )

    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})

describe.skip('the preOrderTraversal function', () => {
  beforeEach(() => {
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.insert(5)
    binarySearchTree.insert(7)

    logger = new Logger()
  })

  it('should be a function', () => {
    expect(typeof binarySearchTree.preOrderTraversal).toBe('function')
  })

  it('should visit all nodes in an pre-order (root, left, right) pattern', () => {
    expect.hasAssertions()
    binarySearchTree.preOrderTraversal(binarySearchTree.root, logger.log)

    // Extract the values out of the logger
    const values = logger.values.map(
      (currentBinaryTree) => currentBinaryTree.value
    )
    expect(values).toEqual([4, 2, 1, 3, 6, 5, 7])
  })
})

describe.skip('the postOrderTraversal function', () => {
  beforeEach(() => {
    binarySearchTree.insert(4)
    binarySearchTree.insert(2)
    binarySearchTree.insert(6)
    binarySearchTree.insert(1)
    binarySearchTree.insert(3)
    binarySearchTree.insert(5)
    binarySearchTree.insert(7)

    logger = new Logger()
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof binarySearchTree.postOrderTraversal).toBe('function')
  })

  it('should visit all nodes in an post-order (left, right, root) pattern', () => {
    expect.hasAssertions()
    binarySearchTree.postOrderTraversal(binarySearchTree.root, logger.log)

    // Extract the values out of the logger
    const values = logger.values.map(
      (currentBinaryTree) => currentBinaryTree.value
    )

    expect(values).toStrictEqual([1, 3, 2, 5, 7, 6, 4])
  })
})
