/*
  eslint-disable
  class-methods-use-this,
  @typescript-eslint/member-ordering,
  no-console
*/

import type { ITree, ITreeNode } from './tree.interface'

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
    if (this._value === searchValue) {
      return true
    }
    return (
      Boolean(this._children) &&
      Boolean(
        this._children.reduce(
          (acc, child) => acc || Boolean(child.contains(searchValue)),
          false
        )
      )
    )
  }

  /**
   * Insert a new Tree as child of the given Trees
   * @param {ITree<T>} parentTree
   * @param {T} value
   * @returns {(undefined | ITree<T>)}
   * @memberof Tree
   */
  public insert(parentTree: ITree<T>, value: T): undefined | ITree<T> {
    const leaf = Tree.find(this, parentTree.value)
    if (leaf) {
      leaf.insertChild(value)
    }
    return leaf
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
      if (child.value === value) {
        this._children.splice(index, 1)
      } else {
        child.remove(value)
      }
    })
  }

  public reorder(node1, node2): void {
    throw new Error('Method no implemented yet')
  }

  /**
   * Find returns the tree containing the value or undefined
   * @static
   * @template A
   * @param {ITreeNode<A>} tree
   * @param {A} value
   * @returns {ITreeNode<A> | undefined} return the tree containing the value
   * @memberof Tree
   */
  static find<A>(tree: ITree<A>, value: A): undefined | ITree<A> {
    // eslint-disable-next-line init-declarations
    let result: undefined | ITree<A>
    Tree.traverse(tree, (node) => {
      if (node.value === value) {
        result = node
      }
    })

    return result
  }

  static size<A>(tree: ITreeNode<A>): number {
    // throw new Error('Method no implemented yet')
    if (!tree) {
      return 0
    }
    if (!tree.children.length) {
      return 1
    }

    return tree.children.reduce((acc, child) => {
      return acc + Tree.size(child)
    }, 1)
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
