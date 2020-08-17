import React from 'react'
import ReactDOM from 'react-dom'

import Callback from './callback'
import Context from './context'
import Effect from './effect'
import ImperativeHandle from './imperative-handle'
import LayoutEffect from './layout-effect'
import Memo from './memo'
import Reducer from './reducer'
import Ref from './ref'
import State from './state'

import './styles.css'

function App(): JSX.Element {
  return (
    <div className="App">
      <State />
      <hr />
      <Effect />
      <hr />
      <Context />
      <hr />
      <Ref />
      <hr />
      <Reducer />
      <hr />
      <Memo />
      <hr />
      <Callback />
      <hr />
      <LayoutEffect />
      <hr />
      <ImperativeHandle />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
