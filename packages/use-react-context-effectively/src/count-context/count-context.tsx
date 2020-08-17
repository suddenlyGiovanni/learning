import React, {
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  ReactElement,
  Reducer,
  Dispatch,
  useContext,
} from 'react'

const CountStateContext = createContext<State | undefined>(undefined)
const CountDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
)

type Event<T extends string, P extends {} = {}> = {
  type: T
  payload?: P
}
type Action =
  | Event<'increment'>
  | Event<'decrement'>
  | Event<'reset'>
  | Event<string>
type State = { count: number }

const initialState: State = { count: 0 }

const countReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 }
    }

    case 'decrement': {
      return { count: state.count - 1 }
    }

    case 'reset': {
      return initialState
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function CountProvider({ children }: { children: ReactNode }): ReactElement {
  const [state, dispatch] = useReducer(countReducer, initialState)

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState(): State {
  const context = useContext(CountStateContext)

  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  const dispatch = useContext(CountDispatchContext)
  if (dispatch === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  const increment = useCallback(() => dispatch({ type: 'increment' }), [
    dispatch,
  ])
  const decrement = useCallback(() => dispatch({ type: 'decrement' }), [
    dispatch,
  ])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [dispatch])
  return { increment, decrement, reset }
}

export { CountProvider, useCountState, useCountDispatch }
