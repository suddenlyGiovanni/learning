/*
  eslint-disable
  @typescript-eslint/no-unused-vars,
  class-methods-use-this,
  max-classes-per-file,
  max-lines-per-function,
  max-statements,
  no-inline-comments,
  no-param-reassign,
  no-unused-vars,
*/

import type {
  IBinarySearchTree,
  INode,
} from '../interfaces/binary-search-trees.interface'
import { VariadicFunction } from '../types'

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
    const containsHelper = (node: null | INode<T>): boolean => {
      if (node === null) return false
      if (value === node.value) return true
      return value < node.value
        ? containsHelper(node.left)
        : containsHelper(node.right)
    }

    return containsHelper(this.root)
  }

  public inOrderTraversal(
    node: null | INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void {
    // 1. base case
    if (node !== null) {
      // 2. recursive case
      if (node.left !== null) {
        this.inOrderTraversal(node.left, func)
      }
      func(node)

      if (node.right !== null) {
        this.inOrderTraversal(node.right, func)
      }
    }
  }

  public insert(value: T): undefined | INode<T> {
    /*
     * To insert an element in a BST
     * we have to find an empty space where
     * the element insertion fulfills the BST rule:
     * 1. every sub-tree on the left has to be 'smaller than' the parent node
     * 2. every sub-tree on the right has to be 'bigger than' the parent node
     */

    const insertionHelper = (node: INode<T>): undefined | INode<T> => {
      /* If value is less than _node then: */
      if (value < node.value) {
        /*
         * If there is no left,
         * then set the value as new left sub-tree
         */
        if (node.left === null) {
          node.left = new Node(value)
          return node.left
        }

        /*
         * If there is already a value as a left node,
         * then we need to traverse deeper into the left sub-tree
         */
        insertionHelper(node.left)
      } else if (value > node.value) {
        /* If value is greater than _node then go right */

        /*
         * If there is no right sub-tree,
         * then set the value as new right sub-tree
         */
        if (node.right === null) {
          node.right = new Node(value)
          return node.right
        }
        /*
         * If there is already a value as a right node,
         * then we need to traverse deeper into the right sub-tree
         */
        insertionHelper(node.right)
      }

      return undefined
    }

    if (this.root === null) {
      this.root = new Node(value)
      return this.root
    }

    return insertionHelper(this.root)
  }

  public max(node: null | INode<T>): null | INode<T> {
    if (node === null) return node
    return node.right === null
      ? node // This is the leaf node at the most right side of the tree
      : this.max(node.right) // Keep traversing the right sub-tree
  }

  public min(node: null | INode<T>): null | INode<T> {
    if (node === null) return node

    return node.left === null
      ? node // This is a leaf node
      : this.min(node.left) // Keep traversing the left sub-tree
  }

  public postOrderTraversal(
    node: null | INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void {
    if (node !== null) {
      if (node.left !== null) {
        this.postOrderTraversal(node.left, func)
      }
      if (node.right !== null) {
        this.postOrderTraversal(node.right, func)
      }
      func(node)
    }
  }

  public preOrderTraversal(
    node: null | INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void {
    if (node !== null) {
      func(node)

      if (node.left !== null) {
        this.preOrderTraversal(node.left, func)
      }

      if (node.right !== null) {
        this.preOrderTraversal(node.right, func)
      }
    }
  }

  public remove(value: T): void {
    const removeHelper = (node: null | INode<T>): null | INode<T> => {
      /*
       * Algorithm:
       * 1. _value is equal to the current node value => Algorith to remove node
       * 2. _value is smaller than the current node value => search the left sub-tree
       * 3. _value is greater than the current node value => search the right sub-tree
       */

      if (node !== null && value === node.value) {
        /*
         * Case 1.
         * a. current node does not have any child nodes
         * b. current node has one child node
         * c. current node has two child nodes
         */
        if (node.left === null && node.right === null) {
          /* Case a. => remove node and return */
          node = null
          return node
        }

        /* Case b. = only one child */
        if (node.left === null) {
          node = node.right
          return node
        }
        if (node.right === null) {
          node = node.left
          return node
        }
        /*
         * Case c. = two child
         *
         *                           +---+
         *                           | 2 |
         *                           +-+-+
         *                             |
         *                             |
         *                      +------+-------+
         *                      |              |
         *                      |              |
         *                    +-v-+          +-v-+
         *                    | 1 |          | 3 |
         *                    +-+-+          +---+
         *                      |
         *                      |
         *           +----------+----------+
         *           |                     |
         *           |                     |
         *         +-v-+                 +-v-+
         *         |0.5|                 |1.5|
         *         +-+-+                 +-+-+
         *           |                     |
         *           |                     |
         *   +-------+             +-------+-------+
         *   |                     |               |
         *   |                     |               |
         * +-v-+                 +-v-+           +-v-+
         * |0.5|                 |1.2|           |1.7|
         * +---+                 +---+           +---+
         */

        const successor = this.min(node.right)!
        successor.left = node.left
        node = node.right
        return node
      } else if (node !== null && node.left !== null && value < node.value) {
        // Case 2.
        node.left = removeHelper(node.left)
      } else if (node !== null && node.right !== null && value > node.value) {
        // Case 3.
        node.right = removeHelper(node.right)
      }
      return node
    }

    if (this.root) {
      this.root = removeHelper(this.root)
    }
  }
}
