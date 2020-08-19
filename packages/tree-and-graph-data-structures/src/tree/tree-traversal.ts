interface Tree<T> {
  children: Tree<T>[]
  name: T
}

const family: Tree<string> = {
  name: 'Ashleigh',
  children: [
    {
      name: 'Sammy',
      children: [
        {
          name: 'Bowser',
          children: [{ name: 'Pickles', children: [] }],
        },
      ],
    },
    { name: 'Alex', children: [] },
  ],
}

function traverse<T>(tree: Tree<T>, cb: (tree: Tree<T>) => void): void {
  cb(tree)
  if (tree.children) {
    tree.children.forEach((child) => {
      traverse(child, cb)
    })
  }
}

export const main = (): void => {
  traverse(family, (node) => console.log(node.name))
}
// main()
