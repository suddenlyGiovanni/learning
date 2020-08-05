import { prompt } from 'inquirer'
import chalk from 'chalk'

import { parseAndEvaluate } from '../parse-and-evaluate/parse-and-evaluate'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function askQuestions() {
  return prompt([{ name: 'COMMAND', type: 'input', message: chalk.blue('>') }])
}
async function repl(): Promise<void> {
  try {
    const answers = await askQuestions()
    const { COMMAND } = answers
    if (COMMAND) {
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)))
    }
  } catch (error) {
    console.error(error)
  }

  repl()
}

if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`
    )
  )
  repl()
}

module.exports = repl
