/*
  eslint-disable
  max-classes-per-file,
  class-methods-use-this,
  no-unused-vars,
  @typescript-eslint/no-unused-vars
*/

import {
  IBinarySearchTree,
  INode,
  VariadicFunction,
} from './binary-search-trees.interface'
export class Node<T> implements INode<T> {
  left: null | Node<T>

  right: null | Node<T>

  value: T

  constructor(value: T) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  root: INode<T> | null

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

  public insert(value: T): void {
    throw new Error('Method not implemented.')
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
