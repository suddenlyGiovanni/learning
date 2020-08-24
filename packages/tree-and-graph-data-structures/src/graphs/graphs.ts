/*
  eslint-disable
  no-console,
  @typescript-eslint/no-non-null-assertion
*/

import { LinkedList } from '../linked-list/linked-list'
import type { ILinkedList } from '../linked-list/linked-list.interface'

export function defaultEqualityPredicate<A>(x: A, y: A): boolean {
  return x === y
}

export class Graph<T> {
  public adjList: Map<T, ILinkedList<T>>

  public nodes: T[]

  private readonly comparatorStrategy: (x: T, y: T) => boolean

  public constructor(
    equalityPredicate: (x: T, y: T) => boolean = defaultEqualityPredicate
  ) {
    this.nodes = []
    this.adjList = new Map<T, ILinkedList<T>>()
    this.comparatorStrategy = equalityPredicate
  }

  public addEdge(node1: T, node2: T): void {
    const linkedListNode1 = this.adjList.get(node1)!
    const linkedListNode2 = this.adjList.get(node2)!
    linkedListNode1.push(node2)
    linkedListNode2.push(node1)
  }

  public addNode(node: T): void {
    // TODO: should the nodes be unique?
    if (this.nodes.indexOf(node) === -1) {
      this.nodes.push(node)
      this.adjList.set(node, new LinkedList<T>())
      return undefined
    }
    return undefined
  }

  public breadthFirstTraversal(
    startingNode: T,
    func: (graph: Graph<T>) => void = console.log
  ) {
    throw new Error('Method not yet implemented')
  }

  public depthFirstTraversal(
    startingNode: T,
    func: (graph: Graph<T>) => void = console.log
  ): void {
    throw new Error('Method not yet implemented')
  }

  public removeEdge(node1: T, node2: T): void {
    throw new Error('Method not yet implemented')
  }

  // eslint-disable-next-line class-methods-use-this
  public removeNode(node: T): void {
    if (this.nodes.indexOf(node) !== -1) {
      /*
       * 1. remove the Node from the `Adjacency List` (keys)
       * 2. remove any edge pointing to this Node in the rest of the `Adjacency List` (values)
       * 3. remove the Node from the list of nodes
       */
      const nodeIdx = this.nodes.indexOf(node)

      // Step 1
      this.adjList.delete(node)

      // Step 2
      this.adjList.forEach((edgeLinkedList) => {
        edgeLinkedList.forEach(({ element }) => {
          if (element === node) {
            edgeLinkedList.remove(element)
          }
        })
      })

      // Step 3
      this.nodes.splice(nodeIdx, 1)
    }
    return undefined
  }
}
