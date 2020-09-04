import { ILinkedList } from './linked-list.interface'

export interface IGraph<T> {
  adjList: Map<T, ILinkedList<T>>

  nodes: T[]

  /**
   * @param {T} node1
   * @param {T} node2
   * @memberof IGraph
   */
  addEdge(node1: T, node2: T): void

  /**
   * @param {T} node
   * @memberof IGraph
   */
  addNode(node: T): void

  /**
   * Algorithms:
   * 1. Enqueue the first vertex
   * 2. mark the first vertex as visited
   * 3. repeat this routine:
   *   a. visit the next vertex adjacent to the first vertex
   *   b. mark this vertex as visited
   *   c. enqueue this vertex
   * 3. repeat until all adjacent vertices visited
   * 4. repeat this routine:
   *   a. dequeue next vertex from the queue
   *      repeat
   *        aa. visit next unvisited vertex adjacent to that at the front of the queue
   *        ab. mark this vertex as visited
   *        ac. enqueue this vertex
   *      until all adjacent vertices visited
   * 4. until the queue is empty
   * @param {T} startingNode
   * @param {(node: T) => void} cb
   * @memberof IGraph
   */
  breadthFirstTraversal(startingNode: T, cb: (node: T) => void): void

  /**
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
   * @param {T} startingNode
   * @param {(node: T) => void} cb
   * @memberof IGraph
   */
  depthFirstTraversal(startingNode: T, cb: (node: T) => void): void

  /**
   * @param {T} node1
   * @param {T} node2
   * @memberof IGraph
   */
  removeEdge(node1: T, node2: T): void

  /**
   * 1. remove the Node from the `Adjacency List` (keys)
   * 2. remove any edge pointing to this Node in the rest of the `Adjacency List` (values)
   * 3. remove the Node from the list of nodes
   * @param {T} node
   * @memberof IGraph
   */
  removeNode(node: T): void
}
