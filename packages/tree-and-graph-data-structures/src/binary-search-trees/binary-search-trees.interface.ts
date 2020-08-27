export type VariadicFunction<A extends unknown[], B> = (...args: [...A]) => B

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
   * @param {INode<T>} node
   * @param {<A extends unknown[], B>(...xs: [...A]) => B} func
   * @memberof IBinarySearchTree
   */
  inOrderTraversal(
    node: INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void

  /**
   * @param {T} value
   * @memberof IBinarySearchTree
   */
  insert(value: T): void

  /**
   * @param {INode<T>} node
   * @memberof IBinarySearchTree
   */
  max(node: null | INode<T>): undefined | INode<T>

  /**
   * @param {INode<T>} node
   * @memberof IBinarySearchTree
   */
  min(node: null | INode<T>): undefined | INode<T>

  /**
   * Left, right, root
   * @param {INode<T>} node
   * @param {VariadicFunction<[INode<T>], void>} func
   * @memberof IBinarySearchTree
   */
  postOrderTraversal(
    node: INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void

  /**
   * Root, left, right
   * @param {INode<T>} node
   * @param {VariadicFunction<[INode<T>], void>} func
   * @memberof IBinarySearchTree
   */
  preOrderTraversal(
    node: INode<T>,
    func: VariadicFunction<[INode<T>], void>
  ): void

  /**
   * @param {T} value
   * @memberof IBinarySearchTree
   */
  remove(value: T): void
}
