const { fromNullable } = require('../src/either')
const Box = require('../src/functor')
const Task = require('data.task')

const httpGet = (path, params) =>
  Task.of('search-result')

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

const autoComplete = term =>
  fromNullable(term)
  .map(t => httpGet('/search', {term: t}))
  .fold(e => Task.of(null), x => x)

autoComplete('yo')
.fork(e => console.error(e),
      x => console.log(`updated screen: ${x}`))
