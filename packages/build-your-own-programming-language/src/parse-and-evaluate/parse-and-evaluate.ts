// const { parseProgram } = require('./parse-program');

import { tokenize } from '../tokenize/tokenize'
import parse from '../parse/parse'
import { pipe } from '../utils/utils'
import { evaluate } from '../evaluate/evaluate'
import { transform } from '../transform/transform'

const parseAndEvaluate = pipe(tokenize, parse.parse, transform, evaluate)

const tokenizeAndParse = pipe(tokenize, parse.parse)

const parseAndEvaluateProgram = pipe(
  tokenize,
  // parseProgram,
  evaluate
)

export { parseAndEvaluate, tokenizeAndParse, parseAndEvaluateProgram }
