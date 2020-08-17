import { useState, useEffect } from 'react'

const useMouse = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const changePosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    document.addEventListener('click', changePosition)

    return () => {
      document.removeEventListener('click', changePosition)
    }
  })

  return position
}

export default useMouse