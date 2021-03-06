import { VariadicFunction } from '../types'

/**
 * @export
 * @interface INode
 * @template T
 */
export interface INode<T> {
  /**
   * @type {(null | INode<T>)}
   * @memberof INode
   */
  left: null | INode<T>

  /**
   * @type {(null | INode<T>)}
   * @memberof INode
   */
  right: null | INode<T>

  /**
   * @type {T}
   * @memberof INode
   */
  value: T
}

/**
 * @export
 * @interface IBinarySearchTree
 * @template T
 */
export interface IBinarySearchTree<T> {
  root: null | INode<T>

  /**
   * @param {T} value
   * @returns {boolean}
   * @memberof IBinarySearchTree
   */
  contains(value: T): boolean

  /**
   * Left, root, right
   * @param {(null |INode<T>)} node
   * @param {VariadicFunction<[INode<T>], void>} func
   * @memberof IBinarySearchTree
   */
  inOrderTraversal(
    node: null |INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void

  /**
   * @param {T} value
   * @returns {(undefined | INode<T>)}
   * @memberof IBinarySearchTree
   */
  insert(value: T): undefined | INode<T>

  /**
   * @param {(null | INode<T>)} node
   * @returns {(null | INode<T>)}
   * @memberof IBinarySearchTree
   */
  max(node: null | INode<T>): null | INode<T>

  /**
   * @param {(null | INode<T>)} node
   * @returns {(null | INode<T>)}
   * @memberof IBinarySearchTree
   */
  min(node: null | INode<T>): null | INode<T>

  /**
   * Left, right, root
   * @param {(null | INode<T>)} node
   * @param {VariadicFunction<[INode<T>], void>} func
   * @memberof IBinarySearchTree
   */
  postOrderTraversal(
    node: null | INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void

  /**
   * Root, left, right
   * @param {(null | INode<T>)} node
   * @param {VariadicFunction<[INode<T>], void>} func
   * @memberof IBinarySearchTree
   */
  preOrderTraversal(
    node: null | INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void

  /**
   * @param {T} value
   * @memberof IBinarySearchTree
   */
  remove(value: T): void
}
