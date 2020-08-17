import React, { useEffect, useRef } from "react";
import "./render-count.css";
export function useRenderCount(): JSX.Element {
  const ref = useRef<any>()
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(
        Number(ref.current?.textContent || '0') + 1
      )
    }
  })
  return <span className="RenderCount" ref={ref} />
}
