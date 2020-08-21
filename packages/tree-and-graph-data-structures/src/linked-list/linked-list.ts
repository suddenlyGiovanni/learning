/*
  eslint-disable
  max-statements,
  @typescript-eslint/no-non-null-assertion,
  no-plusplus,
  max-lines-per-function,
  max-lines,
*/

import { Node } from './linked-list-node'
import type {
  ILinkedList,
  ILinkedListNode as INode,
} from './linked-list.interface'

export function defaultEqualityPredicate<A>(x: A, y: A): boolean {
  return x === y
}

export class LinkedList<T> implements ILinkedList<T> {
  private readonly comparatorStrategy: (x: T, y: T) => boolean

  private count: number

  private head: INode<T> | undefined

  private tail: INode<T> | undefined

  public constructor(
    equalityPredicate: (x: T, y: T) => boolean = defaultEqualityPredicate
  ) {
    this.head = undefined
    this.tail = this.head
    this.count = 0
    this.comparatorStrategy = equalityPredicate
  }

  /**
   * Traverse the linked list sequentially and call the provided cb with the current node and index
   * an explicit (and truthy) return from the callback function will stop the traversal and
   * return that value out of to the traverse
   * @static
   * @template A
   * @template B
   * @param {ILinkedList<A>} linkedList
   * @param {((
   *       nodes: {
   *         currentNode: INode<A>
   *         nextNode: undefined | INode<A>
   *         previousNode: undefined | INode<A>
   *       },
   *       index: number,
   *       length: number
   *     ) => B)} cb
   * @returns {(undefined | B)}
   * @memberof LinkedList
   */
  private static traverse<A, B>(
    linkedList: ILinkedList<A>,
    cb: (
      nodes: {
        currentNode: INode<A>
        nextNode: undefined | INode<A>
        previousNode: undefined | INode<A>
      },
      index: number,
      length: number
    ) => B
  ): undefined | B {
    // eslint-disable-next-line no-undef-init
    let previousNode: undefined | INode<A> = undefined
    let currentNode: undefined | INode<A> = linkedList.getHead()
    let nextNode: undefined | INode<A> = currentNode?.next

    for (let i = 0; currentNode && i < linkedList.size(); i++) {
      const resp = cb(
        { currentNode, nextNode, previousNode },
        i,
        linkedList.size()
      )

      if (resp) {
        return resp
      }
      previousNode = currentNode
      nextNode = currentNode.next?.next
      currentNode = currentNode.next
    }
    return undefined
  }

  /**
   * Iterator of elements in the LinkedList
   */
  *[Symbol.iterator](): IterableIterator<INode<T>> {
    let node = this.head
    while (node) {
      yield node
      node = node.next
    }
  }

  /**
   * Clears the list
   */
  public clear(): void {
    this.head = undefined
    this.tail = undefined
    this.count = 0
  }

  public forEach(cb: (node: INode<T>) => void): this {
    for (const node of this) {
      cb(node)
    }
    return this
  }

  /**
   * This method returns the element of a specific position in the list.
   * If the element does not exist in the list, it returns undefined.
   */
  public getElementAt(index: number): INode<T> | undefined {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; node && i < index; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  /**
   * This method returns the head of the list.
   */
  public getHead(): INode<T> | undefined {
    return this.head
  }

  /**
   * This method returns the index of the element in the list.
   * If the element does not exist in the list, it returns -1.
   */
  public indexOf(element: T): -1 | number {
    if (this.head) {
      if (this.comparatorStrategy(this.head.element, element)) {
        return 0
      }

      const index = LinkedList.traverse(this, ({ currentNode }, i) => {
        if (currentNode.element === element) {
          return i
        }
      })
      return index ? index : -1
    }
    return -1
  }

  /**
   * Inserts a new element at a specified index in the list
   */
  public insert(element: T, index: number): boolean {
    if (Number.isInteger(index) && index >= 0 && index <= this.count) {
      const node = new Node(element)

      if (index === 0) {
        // eslint-disable-next-line no-negated-condition
        if (!this.head) {
          /*
           * Case: empty list
           * 1. set head to be the new node
           * 2. set tail to also point to the new node
           */
          this.head = node
          this.tail = node
        } else {
          /*
           * Case: inset to the head of a list of size 1 or more
           * 1. point the current head to the next property of the new node
           * 2. set the new node to be the new head
           */
          node.next = this.head
          this.head = node
        }
        this.count++
        return true
      }

      if (!this.head) {
        return false
      }

      // Case: inserting at the tail of the list
      if (index === this.count) {
        this.tail!.next = node
        this.tail = node
        this.count++
        return true
      }

      /*
       * Case: inserting at any other position
       * 1. iterate throughout the whole list and stop on the node preceding the desired index
       * 2. set the new node next to point to the node at specified index (node.next = current.next)
       * 3. set the current.next to point to the new node
       */
      let current = this.head
      for (let i = 1; current.next && i < index; i++) {
        current = current.next
      }
      node.next = current.next
      current.next = node
      this.count++
      return true
    }
    return false
  }

  /**
   * This method returns true if the linked list does not contain any elements,
   * and false if the size of the linked list is bigger than 0
   */
  public isEmpty(): boolean {
    return this.size() === 0
  }

  public map<U>(cb: (element: T) => U): ILinkedList<U> {
    const linkedList = new LinkedList<U>()
    for (const node of this) {
      linkedList.push(cb(node.element))
    }
    return linkedList
  }

  /**
   * This method adds a new element to the end of the list
   */
  public push(element: T): void {
    const node = new Node(element)
    // eslint-disable-next-line no-negated-condition
    if (!this.head) {
      this.head = node
      this.tail = this.head
    } else {
      // There must be a tail that is not undefined
      this.tail!.next = node
      this.tail = node
    }
    this.count++
  }

  /**
   * This method removes an element from the list
   */
  public remove(element: T): undefined | T {
    const nodes = LinkedList.traverse(this, (_nodes) =>
      this.comparatorStrategy(_nodes.currentNode.element, element)
        ? _nodes
        : undefined
    )

    if (nodes) {
      const { previousNode, currentNode, nextNode } = nodes
      const node = this.removeNode(previousNode, currentNode, nextNode)
      return node.element
    }
    return undefined
  }

  /**
   * This method removes an item from a specified index in the list.
   */
  public removeAt(index: number): T | undefined {
    if (Number.isInteger(index) && index >= 0 && index <= this.count) {
      const nodes = LinkedList.traverse(this, (_nodes, i) =>
        i === index ? _nodes : undefined
      )

      if (nodes) {
        const { previousNode, currentNode, nextNode } = nodes
        const { element } = this.removeNode(previousNode, currentNode, nextNode)
        return element
      }
    }
    return undefined
  }

  /**
   * This method returns the number of elements the linked list contains.
   * It is similar to the length property of the array.
   */
  public size(): number {
    return this.count
  }

  /**
   * This method returns a string representation of the linked list.
   * As the list uses a Node class as an element, we need to overwrite the default toString method
   * inherited from the JavaScript Object class to output only the element values
   */
  public toString(): string {
    if (!this.head) {
      return ''
    }
    let objString = String(this.head.element)
    let current = this.head.next
    for (let i = 1; i < this.size() && current; i++) {
      objString = `${objString},${String(current.element)}`
      current = current.next
    }
    return objString
  }

  private removeNode(
    previousNode: undefined | INode<T>,
    currentNode: INode<T>,
    nextNode: undefined | INode<T>
  ): INode<T> {
    // Case: remove from the head
    if (!previousNode) {
      // Current node is the head
      if (!nextNode) {
        /*
         * Sub case .a: Linked list of size 1
         * once the node is removed the linked list is empty
         */
        const node = new Node(currentNode.element)
        this.clear()
        return node
      }
      /*
       * Sub case .b: Linked list of size n
       */
      this.head = nextNode
      currentNode.next = undefined
      this.count--
      return currentNode
    }

    if (!nextNode) {
      // Current node is the tail
      previousNode.next = undefined
      this.tail = previousNode
      this.count--
      return currentNode
    }

    // Case: remove from the middle
    previousNode.next = nextNode
    currentNode.next = undefined
    this.count--
    return currentNode
  }
}
