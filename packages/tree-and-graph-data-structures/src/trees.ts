/* eslint-disable no-console */
/* eslint-disable class-methods-use-this, @typescript-eslint/member-ordering */

export interface ITreeNode<T> {
  children: null | ITree<T>[]
  value: T
}

/**
 * # Tree interface
 * @template T
 *
 * Common operation on tree:
 * - Enumerating all the items
 * - Enumerating a section of a tree
 * - Searching for an item
 * - Adding a new item at a certain position on the tree
 * - Deleting an item
 * - Pruning: Removing a whole section of a tree
 * - Grafting: Adding a whole section to a tree
 * - Finding the root for any node
 * - Finding the lowest common ancestor of two nodes
 */
export interface ITree<T> extends ITreeNode<T> {
  contains(searchValue: T): boolean
  insert(parentTree: ITree<T>, value: T): void

  /**
   * Adds a new value as a child of the tree
   * @param {T} value - the value to add
   */
  insertChild(value: T): void

  /**
   * Removes a value from the tree
   * @param {T} value - the value to remove
   */
  remove(value: T): void

  reorder(node1: ITreeNode<T>, node2: ITreeNode<T>): void
}

/** Class representing a Tree. */
export class Tree<T> implements ITree<T> {
  private readonly _children: ITree<T>[]

  private readonly _value: T

  public constructor(value: T) {
    this._value = value
    this._children = []
  }

  public get value(): T {
    return this._value
  }

  public get children(): ITree<T>[] {
    return this._children
  }

  public contains(searchValue: T): boolean {
    let result = false
    Tree.traverse(this, (treeNode) => {
      result = result || treeNode.value === searchValue
    })
    return result
  }

  public insert(parentTree: ITree<T>, value: T): void {
    throw new Error('Method no implemented yet')
  }

  /**
   * Adds a new value as a child of the tree
   * @param {T} value - the value to add
   * @returns {ITree<T>} - the new sub-trees
   */
  public insertChild(value: T): ITree<T> {
    const newTree = new Tree<T>(value)
    this._children.push(newTree)
    return newTree
  }

  /*
   * Removes a value from the tree
   * @param {T} value - the value to remove
   */
  public remove(value: T): void {
    /*
     * Three cases:
     * 1 - the value is hold at the present node (node.value)
     * 2 - the value is nested in one of the children nodes
     * 3 - the value is not present
     */
    if (this._value === value) {
      delete this
    }
    this._children.forEach((child, index) => {
      if(child.value === value) {
        this._children.splice(index, 1)
      } else {
        child.remove(value)
      }
    })
  }

  public reorder(node1, node2): void {
    throw new Error('Method no implemented yet')
  }

  static find(tree, value): void {
    throw new Error('Method no implemented yet')
  }

  static size(tree): void {
    throw new Error('Method no implemented yet')
  }

  static traverse<A>(
    tree: ITree<A>,
    func: (tree: ITree<A>) => void = console.log
  ): void {
    func(tree)
    tree.children?.forEach((child) => {
      Tree.traverse(child, func)
    })
  }
}

export const main = (): void => {
  const myTree = new Tree(1)
  // eslint-disable-next-line no-console
  console.log(myTree)
}
