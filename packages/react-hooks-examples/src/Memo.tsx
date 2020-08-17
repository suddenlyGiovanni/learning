import React, { useState, useMemo, FC } from 'react'

const fibonacci = (n: number): number =>
  n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)

const MemoComponent: FC = () => {
  const [num, setNum] = useState<number>(1)
  const [isGreen, setIsGreen] = useState<boolean>(true)

  const fib = useMemo(() => fibonacci(num), [num])

  const color = isGreen ? 'limegreen' : 'crimson'

  const toggleColor = (): void => setIsGreen(!isGreen)

  const increaseFibNum = (): void => setNum(num + 1)

  return (
    <div>
      <h1 onClick={toggleColor} style={{ color }}>
        useMemo Example
      </h1>
      <h2>
        Fibonacci of {num} is {fib}
      </h2>
      <button onClick={increaseFibNum}>➕</button>
    </div>
  )
}

export default MemoComponent
