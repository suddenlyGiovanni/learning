/*
  eslint-disable
  @typescript-eslint/no-non-null-assertion,
  max-statements,
  no-console,
*/

import { LinkedList } from '../linked-list/linked-list'
import type { ILinkedList } from '../linked-list/linked-list.interface'
import { Stack } from '../stack/stack'

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
    this.comparatorStrategy = equalityPredicate
    this.adjList = new Map<T, ILinkedList<T>>()
  }

  public addEdge(node1: T, node2: T): void {
    if (this.nodes.includes(node1) && this.nodes.includes(node2)) {
      const node1Edges = this.adjList.get(node1)!
      const node2Edges = this.adjList.get(node2)!
      node1Edges.push(node2)
      node2Edges.push(node1)
    } else {
      throw new Error('Please pass in valid Vertices/Nodes')
    }
  }

  public addNode(node: T): void {
    if (this.nodes.indexOf(node) === -1) {
      this.nodes.push(node)
      this.adjList.set(node, new LinkedList<T>(this.comparatorStrategy))
    } else {
      throw new Error('Not unique Vertex/Node')
    }
  }

  public breadthFirstTraversal(
    startingNode: T,
    func: (node: T) => void = console.log
  ) {
    throw new Error('Method not yet implemented')
  }

  public depthFirstTraversal(
    startingNode: T,
    cb: (node: T) => void = console.log
  ): void {
    if (this.nodes.includes(startingNode)) {
      /*
       * Algorithms:
       * 1. Push the first vertex onto the stack
       * 2. mark this vertex as visited
       * 3. repeat this routine:
       *   a. visit the next vertex adjacent to the one on the top of the stack
       *   b. push this vertex onto the stack
       *   c. mark this vertex as visited
       *   d. if there isn't a vertex to visit
       *        pop this vertex off the stack
       *      end if
       * 3. repeat until stack is empty
       */
      const nodeStack = new Stack<T>()
      const visitedSet = new Set<T>()

      nodeStack.push(startingNode)
      visitedSet.add(startingNode)

      while (!nodeStack.isEmpty()) {
        const current = nodeStack.pop()!
        const adjacentVertices = this.adjList.get(current)!
        cb(current)

        adjacentVertices.forEach(({ element: adjacentVertex }) => {
          if (!visitedSet.has(adjacentVertex)) {
            nodeStack.push(adjacentVertex)
            visitedSet.add(adjacentVertex)
          }
        })
      }
    } else {
      throw new Error('Invalid starting node was provided')
    }
  }

  public removeEdge(node1: T, node2: T): void {
    if (
      this.nodes.includes(node1) &&
      this.nodes.includes(node2) &&
      (this.adjList.has(node1) || this.adjList.has(node2))
    ) {
      /*
       * 1. remove from adjList of node1 the edge pointer of node2
       * 2. remove from adjList of node2 the edge pointer of node1
       */
      const node1Edges = this.adjList.get(node1)!
      const node2Edges = this.adjList.get(node2)!
      node1Edges.remove(node2)
      node2Edges.remove(node1)
    } else {
      throw new Error('Please pass in valid Vertices/Nodes')
    }
  }

  public removeNode(node: T): void {
    // eslint-disable-next-line no-negated-condition
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
    } else {
      throw new Error('Please pass in valid Vertex')
    }
  }
}
