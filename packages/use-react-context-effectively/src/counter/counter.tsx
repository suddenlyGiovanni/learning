import React, { memo } from 'react'
import { useCountDispatch } from '../count-context/count-context'
import { useRenderCount } from '../render-count/render-count'

import './counter.css'

export const CounterControls = memo(function CounterControls(): JSX.Element {
  const { decrement, increment, reset } = useCountDispatch()
  const renderCount = useRenderCount()

  return (
    <div className="CounterControls">
      renders: {renderCount}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>0</button>
    </div>
  )
})
