export interface IBinaryTreeNode<T> {
  left: null | IBinaryTree<T>
  right: null | IBinaryTree<T>
  value: T
}

export interface IBinaryTreeLeaf<T> {
  left: null
  right: null
  value: T
}

/**
 * # Common operations
 *
 * ## Insertion
 * Nodes can be inserted into binary trees in between two other nodes or added after a leaf node.
 * In binary trees, a node that is inserted is specified as to which child it is.
 *
 * ### Leaf nodes
 * To add a new node after leaf node A, A assigns the new node as one of its children and the new
 * node assigns node A as its parent.
 *
 * ### Internal nodes
 * Insertion on internal nodes is slightly more complex than on leaf nodes.
 * Say that the internal node is node A and that node B is the child of A.
 * (If the insertion is to insert a right child, then B is the right child of A, and similarly with
 * a left child insertion.)
 * A assigns its child to the new node and the new node assigns its parent to A.
 * Then the new node assigns its child to B and B assigns its parent as the new node.
 *
 * ## Deletion
 * Deletion is the process whereby a node is removed from the tree.
 * Only certain nodes in a binary tree can be removed unambiguously.
 *
 * ### Node with zero or one children
 * Suppose that the node to delete is node A. If A has no children, deletion is accomplished by
 * setting the child of A's parent to null. If A has one child, set the parent of A's child to A's
 * parent and set the child of A's parent to A's child.
 *
 * ### Node with two children
 * In a binary tree, a node with two children cannot be deleted unambiguously.
 * However, in certain binary trees (including binary search trees) these nodes can be deleted,
 * though with a rearrangement of the tree structure.
 *
 * ## Traversal
 * Pre-order, in-order, and post-order traversal visit each node in a tree by recursively visiting
 * each node in the left and right subtrees of the root.
 *
 * ### Depth-first order
 * In depth-first order, we always attempt to visit the node farthest from the root node that we
 * can, but with the caveat that it must be a child of a node we have already visited.
 * Unlike a depth-first search on graphs, there is no need to remember all the nodes we have
 * visited, because a tree cannot contain cycles.
 * Pre-order is a special case of this.
 *
 * The general recursive pattern for traversing a binary tree is this:
 * Go down one level to the recursive argument N. If N exists (is non-empty) execute the following
 * three operations in a certain order:
 * - (L) Recursively traverse N's left subtree.
 * - (R) Recursively traverse N's right subtree.
 * - (N) Process the current node N itself.
 * Return by going up one level and arriving at the parent node of N.
 *
 * ### Breadth-first order
 * Contrasting with depth-first order is breadth-first order, which always attempts to visit the
 * node closest to the root that it has not already visited. Also called a level-order traversal.
 * In a complete binary tree, a node's breadth-index (i − (2d − 1)) can be used as traversal
 * instructions from the root. Reading bitwise from left to right, starting at bit d − 1, where d
 * is the node's distance from the root (d = ⌊log2(i+1)⌋) and the node in question is not the root
 * itself (d > 0). When the breadth-index is masked at bit d − 1, the bit values 0 and 1 mean to
 * step either left or right, respectively. The process continues by successively checking the next
 * bit to the right until there are no more. The rightmost bit indicates the final traversal from
 * the desired node's parent to the node itself. There is a time-space trade-off between iterating
 * a complete binary tree this way versus each node having pointer/s to its sibling/s.
 *
 *
 * ## Fixed Operations:
 * - contains(val),
 * - size(tree),
 * - traverse(tree)
 * ## Dynamic Operations:
 * - insert(x, y),
 * - remove(node),
 * - reOrder(x, y)
 * @interface IBinaryTree
 * @extends {IBinaryTreeNode<T>}
 * @template T
 *
 *
 */
export interface IBinaryTree<T> extends IBinaryTreeNode<T> {
  /**
   * Returns true if value is found
   */
  contains(value: T): boolean

  /**
   * Explores all the nodes in the tree
   * Traversal Order: left, root, right
   */
  inOrderTraversal(cb: (tree: IBinaryTree<T>) => void): void

  insertChild(value: T): void

  /**
   * Explores all the nodes in the tree
   * Traversal Order: left, right, root
   */
  postOrderTraversal(cb: (tree: IBinaryTree<T>) => void): void

  /**
   * # Pre-order (NLR)
   * Explores all the nodes in the tree
   * Traversal Order: root, left, right
   *
   * ## Algorith:
   * 1. Access the data part of the current node.
   * 2. Traverse the left subtree by recursively calling the pre-order function.
   * 3. Traverse the right subtree by recursively calling the pre-order function.
   *
   * The pre-order traversal is a topologically sorted one, because a parent node is processed
   * before any of its child nodes is done.
   */
  preOrderTraversal(cb: (tree: IBinaryTree<T>) => void): void
}
