import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

import {
  rootRouterMiddleware,
  booksRouterMiddleware,
  bookRouterMiddleware,
  getDogsRouterMiddleware,
  getDogRouterMiddleware,
  addDogRouterMiddleware,
  updateDogRouterMiddleware,
  removeDogRouterMiddleware,
} from './route-handlers.ts'

const env = Deno.env.toObject()
const PORT = env.PORT || 4000
const HOST = env.HOST || '127.0.0.1'

const app = new Application()
const router = new Router()

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

// Routes
router.get('/', rootRouterMiddleware)
router.get('/book', booksRouterMiddleware)
router.get<{ id: string }>('/book/:id', bookRouterMiddleware)

router.get('/dogs', getDogsRouterMiddleware)
router.get<{ name: string }>('/dogs/:name', getDogRouterMiddleware)
router.post('/dogs', addDogRouterMiddleware)
router.put<{ name: string }>('/dogs/:name', updateDogRouterMiddleware)
router.delete<{ name: string }>('/dogs/:name', removeDogRouterMiddleware)

app.use(router.routes())
app.use(router.allowedMethods())
app.use()

export function startServer(): void {
  console.log(`Listening on port ${PORT}...`)
  app.listen(`${HOST}:${PORT}`)
}
