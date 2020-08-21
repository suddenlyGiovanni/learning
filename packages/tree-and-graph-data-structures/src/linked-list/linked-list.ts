/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-plusplus */
import { Node } from './linked-list-node'
import type {
  ILinkedList,
  ILinkedListNode as INode,
} from './linked-list.interface'

export function defaultEqualityPredicate<A>(x: A, y: A): boolean {
  return x === y
}

export class LinkedList<T> implements ILinkedList<T> {
  private count: number

  private equalityPredicate: (x: T, y: T) => boolean

  private head: INode<T> | undefined

  private tail: INode<T> | undefined

  constructor(
    equalityPredicate: (x: T, y: T) => boolean = defaultEqualityPredicate
  ) {
    this.head = undefined
    this.tail = this.head
    this.count = 0
    this.equalityPredicate = equalityPredicate
  }

  /**
   * Iterator of elements in the LinkedList
   */
  [Symbol.iterator](): IterableIterator<T> {
    throw new Error('Method not implemented.')
  }

  /**
   * Clears the list
   */
  public clear(): void {
    this.head = undefined
    this.count = 0
  }

  /**
   * This method returns the element of a specific position in the list.
   * If the element does not exist in the list, it returns undefined.
   */
  public getElementAt(index: number): INode<T> | undefined {
    throw new Error('Method not implemented.')
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
  public indexOf(element: T): number {
    throw new Error('Method not implemented.')
  }

  /**
   * Inserts a new element at a specified index in the list
   */
  public insert(element: T, index: number): boolean {
    throw new Error('Method not implemented.')
  }

  /**
   * This method returns true if the linked list does not contain any elements,
   * and false if the size of the linked list is bigger than 0
   */
  public isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * This method adds a new element to the end of the list
   */
  public push(element: T): void {
    const node = new Node(element)
    // eslint-disable-next-line no-negated-condition
    if(!this.head){
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
  public remove(element: T): INode<T> | undefined {
    throw new Error('Method not implemented.')
  }

  /**
   * This method removes an item from a specified index in the list.
   */
  public removeAt(index: number): INode<T> | undefined {
    throw new Error('Method not implemented.')
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
    throw new Error('Method not implemented.')
  }
}
