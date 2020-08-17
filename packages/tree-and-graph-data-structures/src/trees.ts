/* eslint-disable class-methods-use-this, @typescript-eslint/member-ordering */

/** Class representing a Tree. */
interface ITreeNode<T> {
  children: null | ITreeNode<T>[]
  parent: null | ITreeNode<T>
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
interface ITree<T> {
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

export class Tree<T> {
  private children: Tree<T>[]

  private value: T

  constructor(value: T) {
    this.value = value
    this.children = []
  }

  public contains(searchValue: T): boolean {
    throw new Error('Method no implemented yet')
  }

  public insert(parentTree: ITree<T>, value: T) {
    throw new Error('Method no implemented yet')
  }

  /*
   * Adds a new value as a child of the tree
   * @param {T} value - the value to add
   */
  public insertChild(value: T): void {
    throw new Error('Method no implemented yet')
  }

  /*
   * Removes a value from the tree
   * @param {T} value - the value to remove
   */
  public remove(value: T): void {
    throw new Error('Method no implemented yet')
  }

  public reorder(node1, node2) {
    throw new Error('Method no implemented yet')
  }

  static find(tree, value) {
    throw new Error('Method no implemented yet')
  }

  static size(tree) {
    throw new Error('Method no implemented yet')
  }

  static traverse(tree, func = console.log) {
    throw new Error('Method no implemented yet')
  }
}

export const main = (): void => {
  const myTree = new Tree()

  console.log(myTree)
}
