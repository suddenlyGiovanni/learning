/* eslint-disable max-statements */
import type { IBinaryTree } from './binary-tree.interface'

/**
 * Class representing a Binary Tree.
 * @export
 * @class BinaryTree
 * @implements {IBinaryTree<T>}
 * @template T
 */
export class BinaryTree<T> implements IBinaryTree<T> {
  private readonly _value: T

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _left: IBinaryTree<T> | null

  private _right: IBinaryTree<T> | null

  public constructor(value: T) {
    this._value = value
    this._left = null
    this._right = null
  }

  public contains<A extends T>(value: A): boolean {
    if (this._value === value) {
      return true
    }

    return (
      Boolean(this._left?.contains(value)) ||
      Boolean(this._right?.contains(value))
    )
  }

  /**
   * # In-order (LNR)
   * Explores all the nodes in the tree
   * Traversal Order: left, root, right
   *
   * ## Algorith:
   * 1 - Traverse the left subtree by recursively calling the in-order function.
   * 2 - Access the data part of the current node.
   * 3 - Traverse the right subtree by recursively calling the in-order function.
   *
   * In a binary search tree ordered such that in each node the key is greater than all keys in its
   * left subtree and less than all keys in its right subtree, in-order traversal retrieves the
   * keys in ascending sorted order.
   */
  public inOrderTraversal(cb: (tree: IBinaryTree<T>) => void): void {
    if (this._left) {
      this._left.inOrderTraversal(cb)
    }
    cb(this)
    if (this._right) {
      this._right.inOrderTraversal(cb)
    }
  }

  /**
   * Insert a child as a `leaf node`.
   * It fills in the the tree starting from left to right
   * this is a breath first traversal
   */
  public insertChild(value: T): IBinaryTree<T> {
    const newBinaryTree = new BinaryTree(value)

    const queue: IBinaryTree<T>[] = []
    let valueInserted = false
    queue.push(this)

    while (queue.length && !valueInserted) {
      const currentTree = queue.shift()
      if (currentTree) {
        if (currentTree.left && currentTree.right) {
          queue.push(currentTree.left)
          queue.push(currentTree.right)
        } else if (currentTree.left === null) {
          currentTree.left = newBinaryTree
          valueInserted = true
        } else if (currentTree.right === null) {
          currentTree.right = newBinaryTree
          valueInserted = true
        }
      }
    }

    return newBinaryTree
  }

  /**
   * # Post-order (LRN)
   * Explores all the nodes in the tree
   * Traversal Order: left, right, root
   *
   * ## Algorith:
   * 1. Traverse the left subtree by recursively calling the post-order function.
   * 1. Traverse the right subtree by recursively calling the post-order function.
   * 2. Access the data part of the current node.
   *
   * The trace of a traversal is called a sequentialisation of the tree.
   * The traversal trace is a list of each visited root.
   * No one sequentialisation according to pre-, in- or post-order describes the underlying tree
   * uniquely.
   * Given a tree with distinct elements, either pre-order or post-order paired with in-order is
   * sufficient to describe the tree uniquely. However, pre-order with post-order leaves some
   * ambiguity in the tree structure.
   */
  public postOrderTraversal(cb: (tree: IBinaryTree<T>) => void): void {
    if (this._left) {
      this._left.postOrderTraversal(cb)
    }
    if (this._right) {
      this._right.postOrderTraversal(cb)
    }
    cb(this)
  }

  /**
   * # Pre-order (NLR)
   * Explores all the nodes in the tree
   * Traversal Order: root, left, right
   *
   * ## Algorith:
   * 1. Access the data part of the current node.
   * 2. Traverse the left subtree by recursively calling the pre-order function.
   * 3. Traverse the right subtree by recursively calling the pre-order function.
   *
   * The pre-order traversal is a topologically sorted one, because a parent node is processed
   * before any of its child nodes is done.
   */
  public preOrderTraversal(cb: (tree: IBinaryTree<T>) => void): void {
    cb(this)
    if (this._left) {
      this._left.preOrderTraversal(cb)
    }
    if (this._right) {
      this._right.preOrderTraversal(cb)
    }
  }

  public get value(): T {
    return this._value
  }

  public get left(): null | IBinaryTree<T> {
    return this._left
  }

  public set left(leftNode: null | IBinaryTree<T>) {
    this._left = leftNode
  }

  public get right(): null | IBinaryTree<T> {
    return this._right
  }

  public set right(rightNode: null | IBinaryTree<T>) {
    this._right = rightNode
  }
}
