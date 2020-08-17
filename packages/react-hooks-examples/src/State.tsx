import React, { useState, FC } from 'react'

const StateComponent: FC = () => {
  const [isGreen, setIsGreen] = useState<boolean>(true)

  const handleClick = () => setIsGreen(!isGreen)
  const color: string = isGreen ? 'limegreen' : 'crimson'

  return (
    <h1 onClick={handleClick} style={{ color }}>
      useState Example
    </h1>
  )
}

export default StateComponent
