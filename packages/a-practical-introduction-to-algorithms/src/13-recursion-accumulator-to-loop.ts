// Task: rewrite this function so that it uses a loop rather than recursion

export const concatStrings = <A extends string[]>(...xs: [...A]): string =>
  xs.reduce((acc, curr) => String(acc) + String(curr), '')

export const joinElements = <A>(xs: A[], joinString: string): string => {
  let acc = ''

  for (let i = 0; i < xs.length - 1; i++) {
    const x = String(xs[i])
    acc = concatStrings(acc, x, joinString)
  }
  return acc + String(xs[xs.length - 1])
}

joinElements(['s', 'cr', 't cod', ' :) :)'], 'e') //?
