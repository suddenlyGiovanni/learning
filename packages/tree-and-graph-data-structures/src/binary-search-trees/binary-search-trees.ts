/*
  eslint-disable
  @typescript-eslint/no-unused-vars,
  class-methods-use-this,
  max-classes-per-file,
  max-lines-per-function,
  max-statements,
  no-inline-comments,
  no-unused-vars,
*/

import type {
  IBinarySearchTree,
  INode,
  VariadicFunction,
} from './binary-search-trees.interface'

export class Node<T> implements INode<T> {
  public left: null | Node<T>

  public right: null | Node<T>

  public value: T

  public constructor(value: T) {
    this.value = value
    this.left = null
    this.right = null
  }
}

/**
 * Class representing a Binary Search Tree.
 * @export
 * @class BinarySearchTree
 * @implements {IBinarySearchTree<T>}
 * @template T
 */
export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  public root: INode<T> | null

  public constructor() {
    this.root = null
  }

  public contains(value: T): boolean {
    throw new Error('Method not implemented.')
  }

  public inOrderTraversal(
    node: INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void {
    throw new Error('Method not implemented.')
  }

  public insert(value: T): undefined | INode<T> {
    /*
     * To insert an element in a BST
     * we have to find an empty space where
     * the element insertion fulfills the BST rule:
     * 1. every sub-tree on the left has to be 'smaller than' the parent node
     * 2. every sub-tree on the right has to be 'bigger than' the parent node
     */

    const insertionHelper = (
      _node: INode<T>,
      _value: T
    ): undefined | INode<T> => {
      /* If value is less than _node then: */
      if (_value < _node.value) {
        /*
         * If there is no left,
         * then set the value as new left sub-tree
         */
        if (_node.left === null) {
          _node.left = new Node(_value)
          return _node.left
        }

        /*
         * If there is already a value as a left node,
         * then we need to traverse deeper into the left sub-tree
         */
        insertionHelper(_node.left, _value)
      } else if (_value > _node.value) {
        /* If value is greater than _node then go right */

        /*
         * If there is no right sub-tree,
         * then set the value as new right sub-tree
         */
        if (_node.right === null) {
          _node.right = new Node(_value)
          return _node.right
        }
        /*
         * If there is already a value as a right node,
         * then we need to traverse deeper into the right sub-tree
         */
        insertionHelper(_node.right, _value)
      }

      return undefined
    }

    if (this.root === null) {
      this.root = new Node(value)
      return this.root
    }

    return insertionHelper(this.root, value)
  }

  public max(node: INode<T>): void {
    throw new Error('Method not implemented.')
  }

  public min(node: INode<T> | null): void {
    throw new Error('Method not implemented.')
  }

  public postOrderTraversal(
    node: INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void {
    throw new Error('Method not implemented.')
  }

  public preOrderTraversal(
    node: INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void {
    throw new Error('Method not implemented.')
  }

  public remove(value: T): void {
    throw new Error('Method not implemented.')
  }
}
