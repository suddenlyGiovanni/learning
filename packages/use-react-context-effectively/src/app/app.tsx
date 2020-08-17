import React, { useState, useCallback } from 'react'

import './app.css'

import { CountProvider } from '../count-context/count-context'
import { CountDisplay } from '../count-display/count-display'
import { CounterControls } from '../counter/counter'
import { useRenderCount } from '../render-count/render-count'

export default function App() {
  const renderCount = useRenderCount()
  const [, setState] = useState()
  const forceRefresh = useCallback(() => setState({}), [setState])

  return (
    <div className="App">
      <main>
        <h1>How to optimize your context value</h1>
        <span className="App-renders">renders: </span>
        {renderCount}
        <button onClick={forceRefresh}>force render</button>
        <CountProvider>
          <CountDisplay />
          <CounterControls />
        </CountProvider>
      </main>
    </div>
  )
}
