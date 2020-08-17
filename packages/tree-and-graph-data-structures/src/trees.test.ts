/* eslint-disable jest/no-hooks, jest/require-top-level-describe, init-declarations */
import { Logger } from './logger'
import { Tree } from './trees'

let tree: Tree<number>
let logger: Logger<any>

// eslint-disable-next-line jest/no-hooks
beforeEach(() => {
  tree = new Tree(1)
})

test('it should be a function', () => {
  expect.hasAssertions()
  expect(typeof Tree).toBe('function')
})

describe('the insertChild function', () => {
  beforeEach(() => {
    tree.insertChild(2)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof tree.insertChild).toBe('function')
  })

  it('should add a new Tree to the children array', () => {
    expect.hasAssertions()
    expect(tree.children).toHaveLength(1)
  })

  it('the child should be a Tree instance', () => {
    expect.hasAssertions()
    expect(tree.children[0]).toBeInstanceOf(Tree)
    expect(tree.children[0]).toEqual(new Tree(2))
  })
})

describe('the traverse function', () => {
  beforeEach(() => {
    tree.insertChild(2)
    tree.insertChild(3)
    tree.insertChild(4)
    tree.children[0].insertChild(2.1)
    tree.children[0].insertChild(2.2)
    tree.children[0].insertChild(2.3)
    tree.children[0].children[1].insertChild(2.21)
    tree.children[0].children[1].insertChild(2.22)

    logger = new Logger()
  })

  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof Tree.traverse).toBe('function')
  })

  it('should visit every node', () => {
    expect.hasAssertions()
    Tree.traverse(tree, logger.log)
    expect(logger.values).toHaveLength(9)
  })
})

describe('the contains function', () => {
  beforeEach(() => {
    tree.insertChild(2)
    tree.insertChild(3)
    tree.insertChild(4)
    tree.children[0].insertChild(2.1)
    tree.children[0].insertChild(2.2)
    tree.children[0].insertChild(2.3)
    tree.children[0].children[1].insertChild(2.21)
    tree.children[0].children[1].insertChild(2.22)
  })

  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof tree.contains).toBe('function')
  })

  it('should return true when the value is somewhere in the tree', () => {
    expect.hasAssertions()
    expect(tree.contains(1)).toBe(true)
    expect(tree.contains(2)).toBe(true)
    expect(tree.contains(2.1)).toBe(true)
    expect(tree.contains(2.21)).toBe(true)
  })

  it('should return false when the value is not in the tree', () => {
    expect.hasAssertions()
    expect(tree.contains(5)).toBe(false)
  })
})

describe('the size function', () => {
  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof Tree.size).toBe('function')
  })

  it('should return a number equaling the size of the tree', () => {
    expect.hasAssertions()
    expect(typeof Tree.size(tree)).toBe('number')
    expect(Tree.size(tree)).toBe(1)
    tree.insertChild(2)
    expect(Tree.size(tree)).toBe(2)
    tree.children[0].insertChild(3)
    expect(Tree.size(tree)).toBe(3)
  })
})

describe('the find function', () => {
  beforeEach(() => {
    tree.insertChild(2)
    tree.insertChild(3)
    tree.insertChild(4)
    tree.children[0].insertChild(2.1)
    tree.children[0].insertChild(2.2)
    tree.children[0].insertChild(2.3)
    tree.children[0].children[1].insertChild(2.21)
    tree.children[0].children[1].insertChild(2.22)
  })

  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof Tree.find).toBe('function')
  })

  it('should return the tree containing the value', () => {
    expect.hasAssertions()
    const result = Tree.find(tree, 2.3)
    expect(result).toBeInstanceOf(Tree)
    expect(result.value).toBe(2.3)
  })

  it('should return false if the tree does not contain the value', () => {
    expect.hasAssertions()
    const result = Tree.find(tree, 9)
    expect(result).toBe(false)
  })
})

describe('the insert function', () => {
  beforeEach(() => {
    tree.insertChild(2)
    tree.insertChild(3)
    tree.insertChild(4)
    tree.children[0].insertChild(2.1)
    tree.children[0].insertChild(2.2)
    tree.children[0].insertChild(2.3)
    tree.children[0].children[1].insertChild(2.21)
    tree.children[0].children[1].insertChild(2.22)
  })

  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof tree.insert).toBe('function')
  })

  it('should insert a new Tree as child of the given Tree', () => {
    expect.hasAssertions()
    const result = Tree.find(tree, 2.3)
    expect(result.contains(8)).toBe(false)
    tree.insert(result, 8)
    expect(result.contains(8)).toBe(true)
  })
})

describe('the remove function', () => {
  beforeEach(() => {
    tree.insertChild(2)
    tree.insertChild(3)
    tree.insertChild(4)
    tree.children[0].insertChild(2.1)
    tree.children[0].insertChild(2.2)
    tree.children[0].insertChild(2.3)
    tree.children[0].children[1].insertChild(2.21)
    tree.children[0].children[1].insertChild(2.22)
  })

  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof tree.remove).toBe('function')
  })

  it('should remove the node from the tree it is called on', () => {
    expect.hasAssertions()
    tree.remove(2.3)
    expect(tree.contains(2.3)).toBe(false)
  })
})

describe('the reorder function', () => {
  beforeEach(() => {
    tree.insertChild(2)
    tree.insertChild(3)
    tree.insertChild(4)
    tree.children[0].insertChild(2.1)
    tree.children[0].insertChild(2.2)
    tree.children[0].insertChild(2.3)
    tree.children[0].children[1].insertChild(2.21)
    tree.children[0].children[1].insertChild(2.22)

    logger = new Logger()
  })

  afterEach(() => {
    tree = new Tree(1)
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof tree.reorder).toBe('function')
  })

  it('should swap two given nodes in the tree', () => {
    expect.hasAssertions()
    Tree.traverse(tree, logger.log)
    const initialIndex1 = logger.values.indexOf(2.21)
    const initialIndex2 = logger.values.indexOf(2.3)
    tree.reorder(2.21, 2.3)
    Tree.traverse(tree, logger.log)
    const reorderedIndex1 = logger.values.indexOf(2.21)
    const reorderedIndex2 = logger.values.indexOf(2.3)
    expect(reorderedIndex2).toBe(initialIndex1)
    expect(reorderedIndex1).toBe(initialIndex2)
  })

  it('should not the change the order of nodes not being reordered', () => {
    expect.hasAssertions()
    Tree.traverse(tree, logger.log)
    const initialIndex1 = logger.values.indexOf(2.21)
    const initialIndex2 = logger.values.indexOf(2.3)
    tree.reorder(2.3, 4)
    Tree.traverse(tree, logger.log)
    const indexAfterReorder1 = logger.values.indexOf(2.21)
    const indexAfterReorder2 = logger.values.indexOf(2.3)
    expect(initialIndex1).toBe(indexAfterReorder1)
    expect(initialIndex2).toBe(indexAfterReorder2)
  })
})
