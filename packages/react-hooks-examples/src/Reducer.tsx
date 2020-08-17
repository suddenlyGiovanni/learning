import React, { useReducer, FC, Reducer } from 'react'

// fancy logic to make sure the number is between 0 and 255
const limitRGB = (num: number): number => (num < 0 ? 0 : num > 255 ? 255 : num)

interface State {
  r: number
  g: number
  b: number
}

interface Action<T> {
  type: T
}

export type $Values<T extends object> = T[keyof T]

const actionTypes = {
  INCREMENT_R: 'INCREMENT_R',
  INCREMENT_G: 'INCREMENT_G',
  INCREMENT_B: 'INCREMENT_B',
  DECREMENT_R: 'DECREMENT_R',
  DECREMENT_G: 'DECREMENT_G',
  DECREMENT_B: 'DECREMENT_B',
} as const

type Actions = Action<$Values<typeof actionTypes>>

const step = 50

const reducer: Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT_R:
      return Object.assign({}, state, { r: limitRGB(state.r + step) })

    case actionTypes.DECREMENT_R:
      return Object.assign({}, state, { r: limitRGB(state.r - step) })

    case actionTypes.INCREMENT_G:
      return Object.assign({}, state, { g: limitRGB(state.g + step) })

    case actionTypes.DECREMENT_G:
      return Object.assign({}, state, { g: limitRGB(state.g - step) })

    case actionTypes.INCREMENT_B:
      return Object.assign({}, state, { b: limitRGB(state.b + step) })

    case actionTypes.DECREMENT_B:
      return Object.assign({}, state, { b: limitRGB(state.b - step) })

    default:
      return state
  }
}

const ReducerComponent: FC = () => {
  const [{ r, g, b }, dispatch] = useReducer(reducer, { r: 0, g: 0, b: 0 })

  return (
    <div>
      <h1 style={{ color: `rgb(${r}, ${g}, ${b})` }}>useReducer Example</h1>
      <div>
        <span>r</span>
        <button onClick={() => dispatch({ type: actionTypes.INCREMENT_R })}>
          <span role="img" aria-label="increment">
            ➕
          </span>
        </button>
        <button onClick={() => dispatch({ type: actionTypes.DECREMENT_R })}>
          <span role="img" aria-label="decrement">
            ➖
          </span>
        </button>
      </div>
      <div>
        <span>g</span>
        <button onClick={() => dispatch({ type: actionTypes.INCREMENT_G })}>
          <span role="img" aria-label="increment">
            ➕
          </span>
        </button>
        <button onClick={() => dispatch({ type: actionTypes.DECREMENT_G })}>
          <span role="img" aria-label="decrement">
            ➖
          </span>
        </button>
      </div>
      <div>
        <span>b</span>
        <button onClick={() => dispatch({ type: actionTypes.INCREMENT_B })}>
          <span role="img" aria-label="increment">
            ➕
          </span>
        </button>
        <button onClick={() => dispatch({ type: actionTypes.DECREMENT_B })}>
          <span role="img" aria-label="decrement">
            ➖
          </span>
        </button>
      </div>
    </div>
  )
}

export default ReducerComponent
