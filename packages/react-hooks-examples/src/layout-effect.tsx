import React, { useState, useLayoutEffect, useRef, FC } from 'react'

const LayoutEffectComponent: FC = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const el = useRef()

  useLayoutEffect(() => {
    setWidth(el.current.clientWidth)
    setHeight(el.current.clientHeight)
  }, [])

  return (
    <div>
      <h1>useLayoutEffect Example</h1>
      <h2>textarea width: {width}px</h2>
      <h2>textarea height: {height}px</h2>
      <textarea
        onClick={() => {
          setWidth(0)
        }}
        ref={el}
      />
    </div>
  )
}

export default LayoutEffectComponent
