/*
  eslint-disable
  @typescript-eslint/no-non-null-assertion
*/

import { LinkedList } from '../linked-list/linked-list'
import type { ILinkedList } from '../linked-list/linked-list.interface'

export class Graph<T> {
  public adjList: Map<T, ILinkedList<T>>

  public nodes: T[]

  public constructor() {
    this.nodes = []
    this.adjList = new Map<T, ILinkedList<T>>()
  }

  public addEdge(node1: T, node2: T): void {
    throw new Error('Method not yet implemented')
  }

  addEdge(node1, node2) {
  }

  public depthFirstTraversal(startingNode: T, func = console.log) {
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
    throw new Error('Method not yet implemented')
  }
}
