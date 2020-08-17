import type { RouteParams, RouterContext } from 'https://deno.land/x/oak/mod.ts'

type Book = {
  id: string
  title: string
  author: string
}

interface Dog {
  name: string
  age: number
}

let dogs: Dog[] = [
  { name: 'Roger', age: 8 },
  { name: 'Syd', age: 7 },
]

const books = new Map<string, Book>()
books.set('1', {
  id: '1',
  title: 'The Hound of the Baskervilles',
  author: 'Conan Doyle',
})

export const rootRouterMiddleware = <P extends RouteParams, S>(
  ctx: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> | void => {
  ctx.response.body = 'Hello World'
}
export const booksRouterMiddleware = <P extends RouteParams, S>(
  ctx: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> | void => {
  ctx.response.body = Array.from(books.values())
}
export const bookRouterMiddleware = <P extends RouteParams, S>(
  ctx: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> | void => {
  if (ctx.params && ctx.params.id && books.has(ctx.params.id)) {
    ctx.response.body = books.get(ctx.params.id)
  } else {
    ctx.response.body = 'book entry not found'
  }
}

export const getDogsRouterMiddleware = <P extends RouteParams, S>(
  ctx: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> | void => {
  ctx.response.body = [...dogs.values()]
}

export const getDogRouterMiddleware = <P extends RouteParams, S>(
  { params, response }: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> | void => {
  const dog = dogs.filter(dog => dog.name === params.name)
  if (dog.length) {
    response.status = 200
    response.body = dog[0]
    return
  }
  response.status = 400
  response.body = {
    msg: `Cannot find dog ${params.name}`,
  }
}

export const addDogRouterMiddleware = async <P extends RouteParams, S>(
  { request, response }: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> => {
  const body = await request.body()
  const dog: Dog = body.value
  dogs.push(dog)
  response.body = { msg: 'ok' }
  response.status = 200
}

export const updateDogRouterMiddleware = async <P extends RouteParams, S>(
  { params, request, response }: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> => {
  const dog = dogs.find(dog => dog.name === params.name)
  const body = await request.body()
  const { age } = body.value

  if (dog) {
    dogs[dogs.indexOf(dog)].age = age
    response.status = 200
    response.body = { msg: 'OK' }
    return
  }
  response.status = 400
  response.body = { msg: `Cannot find dog ${params.name}` }
}

export const removeDogRouterMiddleware = <P extends RouteParams, S>(
  { params, response }: RouterContext<P, S>,
  next: () => Promise<void>
): Promise<void> | void => {
  const lengthBefore = dogs.length
  dogs = dogs.filter(dog => dog.name !== params.name)
  if (dogs.length === lengthBefore) {
    response.status = 400
    response.body = { msg: `Cannot find dog ${params.name}` }
    return
  }
  response.body = { msg: 'OK' }
  response.status = 200
}
