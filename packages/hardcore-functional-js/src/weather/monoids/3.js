const { Map, List } = require('src/traversable/node_modules/immutable-ext')
const { Sum } = require('../monoid')

const res = [Sum(1), Sum(2), Sum(3)]
            .reduce((acc, x) => acc.concat(x), Sum.empty())

console.log(res)
