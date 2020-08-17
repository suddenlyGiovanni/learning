import React, {
  useState,
  useContext,
  createContext,
  FC,
  Dispatch,
  SetStateAction,
} from 'react'

interface User {
  firstName: string
  lastName: string
  suffix: number
  email: string
}

const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  {
    firstName: 'Bob',
    lastName: 'Bobberson',
    suffix: 1,
    email: 'bobbobberson@example.com',
  },
  (user) => user,
])

const LevelFive: FC = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <div>
      <h5>{`${user.firstName} ${user.lastName} the ${user.suffix} born`}</h5>
      <button
        onClick={() => {
          setUser(Object.assign({}, user, { suffix: user.suffix + 1 }))
        }}
      >
        Increment
      </button>
    </div>
  )
}

const LevelFour: FC = () => (
  <div>
    <h4>fourth level</h4>
    <LevelFive />
  </div>
)

const LevelThree: FC = () => (
  <div>
    <h3>third level</h3>
    <LevelFour />
  </div>
)

const LevelTwo: FC = () => (
  <div>
    <h2>second level</h2>
    <LevelThree />
  </div>
)

const ContextComponent: FC = () => {
  const userState = useState<User>({
    firstName: 'James',
    lastName: 'Jameson',
    suffix: 1,
    email: 'jamesjameson@example.com',
  })

  return (
    <UserContext.Provider value={userState}>
      <h1>first level</h1>
      <LevelTwo />
    </UserContext.Provider>
  )
}

export default ContextComponent
