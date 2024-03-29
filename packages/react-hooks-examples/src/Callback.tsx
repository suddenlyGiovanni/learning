import React, { useState, useEffect, useCallback, memo, FC } from 'react'

const ExpensiveComputationComponent: FC<{
  compute: (n: number) => number
  count: number
}> = memo(({ compute, count }) => {
  return (
    <div>
      <h1>computed: {compute(count)}</h1>
      <h4>last re-render {new Date().toLocaleTimeString()}</h4>
    </div>
  )
})

const CallbackComponent: FC = () => {
  const [time, setTime] = useState(new Date())
  const [count, setCount] = useState<number>(1)
  useEffect(() => {
    const timer = setTimeout(() => setTime(new Date()), 1000)
    return () => clearTimeout(timer)
  }, [])

  const fibonacci = (n: number): number => {
    if (n <= 1) {
      return 1
    }

    return fibonacci(n - 1) + fibonacci(n - 2)
  }

  return (
    <div>
      <h1>useCallback Example {time.toLocaleTimeString()}</h1>
      <button onClick={() => setCount(count + 1)}>
        current count: {count}
      </button>
      <ExpensiveComputationComponent
        compute={useCallback(fibonacci, [])}
        count={count}
      />
    </div>
  )
}

export default CallbackComponent
