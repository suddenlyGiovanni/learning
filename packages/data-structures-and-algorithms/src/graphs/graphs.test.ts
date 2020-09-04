/*
  eslint-disable
  init-declarations,
  jest/no-hooks,
  jest/require-top-level-describe,
  max-statements,
  no-magic-numbers,
*/

import type { IGraph } from '../interfaces/graphs.interface'
import { LinkedList } from '../linked-list/linked-list'
import { ILogger, Logger } from '../utils/logger'

import { Graph } from './graphs'

let graph: IGraph<number>
let logger: ILogger<number>

beforeEach(() => {
  graph = new Graph<number>()
})

test('it should be a function', () => {
  expect.hasAssertions()
  expect(typeof Graph).toBe('function')
})

test('should have an "adjList" property', () => {
  expect.hasAssertions()
  // eslint-disable-next-line no-prototype-builtins
  expect(graph.hasOwnProperty('adjList')).toBe(true)
})

describe('the addNode function', () => {
  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof graph.addNode).toBe('function')
  })

  it('should add a new node to nodes array', () => {
    expect.hasAssertions()
    graph.addNode(2)
    expect(graph.nodes.indexOf(2) > -1).toBe(true)
  })

  it('should add an empty array for the nodes adjacency list', () => {
    expect.hasAssertions()
    graph.addNode(2)
    expect(graph.adjList.get(2)).toStrictEqual(new LinkedList())
  })
})

describe('the addEdge function', () => {
  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof graph.addEdge).toBe('function')
  })

  it('should only allow to add edges between vertices', () => {
    expect.hasAssertions()
    graph.addNode(1)
    expect(() => graph.addEdge(1, NaN)).toThrow(
      'Please pass in valid Vertices/Nodes'
    )
  })

  it('should add a new edge for given nodes/ vertices in the adjacency list', () => {
    expect.hasAssertions()
    graph.addNode(1)
    graph.addNode(2)
    graph.addEdge(1, 2)
    expect(graph.adjList.get(1)!.indexOf(2)).not.toBe(-1)
    expect(graph.adjList.get(2)!.indexOf(1)).not.toBe(-1)
  })
})

describe('the removeNode function', () => {
  beforeEach(() => {
    graph.addNode(1)
    graph.addNode(2)
    graph.addNode(3)
    graph.addEdge(1, 2)
    graph.addEdge(2, 3)
    graph.removeNode(2)
  })

  afterEach(() => {
    graph = new Graph<number>()
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof graph.removeNode).toBe('function')
  })

  it('should remove an existing node from the nodes array', () => {
    expect.hasAssertions()
    expect(graph.nodes).not.toContain(2)
  })

  it('should remove the node from adjLists of all its neighbors', () => {
    expect.hasAssertions()
    expect(graph.adjList.get(1)).not.toContain(2)
    expect(graph.adjList.get(3)).not.toContain(2)
  })

  it('should remove the adjacency list for removed node', () => {
    expect.hasAssertions()
    expect(graph.adjList.get(2)).toBeUndefined()
  })
})

describe('the removeEdge function', () => {
  beforeEach(() => {
    graph.addNode(1)
    graph.addNode(2)
    graph.addNode(3)
    graph.addEdge(1, 2)
    graph.addEdge(2, 3)
  })

  afterEach(() => {
    graph = new Graph()
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof graph.removeEdge).toBe('function')
  })

  it('should remove an existing node from the nodes array', () => {
    expect.hasAssertions()
    graph.removeEdge(1, 2)
    expect(graph.adjList.get(1)).not.toContain(2)
    expect(graph.adjList.get(2)).not.toContain(1)
  })

  it('should return an error message when the indices are not valid', () => {
    expect.hasAssertions()
    expect(() => graph.removeEdge(1, 5)).toThrow(
      'Please pass in valid Vertices/Nodes'
    )
    expect(() => graph.removeEdge(7, 2)).toThrow(
      'Please pass in valid Vertices/Nodes'
    )
  })
})

describe('the depth first traversal function', () => {
  beforeEach(() => {
    graph.addNode(1)
    graph.addNode(2)
    graph.addNode(3)
    graph.addNode(4)
    graph.addNode(5)
    graph.addEdge(1, 2)
    graph.addEdge(2, 3)
    graph.addEdge(1, 3)
    graph.addEdge(3, 4)
    graph.addEdge(4, 5)

    logger = new Logger()
  })

  afterEach(() => {
    graph = new Graph()
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof graph.depthFirstTraversal).toBe('function')
  })

  it('should return a warning when a not valid starting node is provided', () => {
    expect.hasAssertions()
    expect(() => graph.depthFirstTraversal(7, logger.log)).toThrow(
      'Invalid starting node was provided'
    )
  })

  it('should return nodes on opposite ends in a nonsecutive order', () => {
    // Do a depth first traversal and log the result the logger class to store the result
    expect.hasAssertions()
    graph.depthFirstTraversal(1, logger.log)

    const nodeOnOneEnd = logger.values.indexOf(3)
    const nodeOnOtherEnd = logger.values.indexOf(5)
    const distance = Math.abs(nodeOnOneEnd - nodeOnOtherEnd)

    expect(distance).toBeGreaterThanOrEqual(2)
  })
})

describe('the breadth first traversal function', () => {
  beforeEach(() => {
    graph.addNode(1)
    graph.addNode(2)
    graph.addNode(3)
    graph.addNode(4)
    graph.addNode(5)
    graph.addEdge(1, 2)
    graph.addEdge(2, 3)
    graph.addEdge(1, 3)
    graph.addEdge(3, 4)
    graph.addEdge(4, 5)

    logger = new Logger()
  })

  afterEach(() => {
    graph = new Graph()
  })

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof graph.breadthFirstTraversal).toBe('function')
  })

  it('should return a warning when a starting node is not provided', () => {
    expect.hasAssertions()
    expect(() => graph.breadthFirstTraversal(7, logger.log)).toThrow(
      'Invalid starting node was provided'
    )
  })

  it('should return nodes the same distance from starting consecutively', () => {
    // Do a breadth first traversal and log the result the logger class to store the result
    expect.hasAssertions()
    graph.breadthFirstTraversal(1, logger.log)

    const nodeOnOneEnd = logger.values.indexOf(3)
    const nodeOnOtherEnd = logger.values.indexOf(5)
    const distance = Math.abs(nodeOnOneEnd - nodeOnOtherEnd)

    expect(distance).toBeGreaterThanOrEqual(1)
  })
})
