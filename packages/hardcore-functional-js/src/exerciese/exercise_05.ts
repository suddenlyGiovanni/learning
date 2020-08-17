// SETUP
// import { Task } from "Task";

// =========================
const posts = { 1: { title: 'First' }, 2: { title: 'Second' } }

const comments = {
  First: [{ id: 1, body: 'Brilliant!' }],
  Second: [{ id: 2, body: 'Unforgivable' }],
}

const getPost = (id: number) =>
  Task((rej, res) => setTimeout(() => (posts[id] ? res(posts[id]) : rej('not found')), 200))

const getComments = (post: typeof posts) =>
  Task((rej, res) => setTimeout(() => res(comments[post.title]), 200))

// Exercise: Task
// Goal: Refactor each example using Task
// Bonus points: no curly braces

// Ex1: Use the result of getPost() and upperCase the title. Posts and comments are defined above and look like {title: String} and {id: Int, body: String} respectively.
// =========================
const postTitle = (
  id // uppercase the title of the result of getPost()
) => getPost(id)

test('Ex1: postTitle', async () => {
  postTitle(1).fork(console.error, t => {
    expect(t).toBe('FIRST')
  })
})

// Ex2: pass in the post to getComments(), defined above, then assign the returned comments to the post
// =========================
const commentsForPost = id => getPost(id)

test('Ex2: commentsForPost', async () => {
  commentsForPost(2).fork(console.error, t => {
    expect(t.title).toBe('Second')
    expect(t.comments).toBe(comments['Second'])
  })
})

// Ex3: Wrap location.href in a Task to make it "pure"
// =========================
const getHref = location.href // wrap me in Task

test('Ex3: getHref', async () => {
  getHref.fork(console.error, t => {
    expect(true).toBe(!!t.match('cdpn.io'))
  })
})
