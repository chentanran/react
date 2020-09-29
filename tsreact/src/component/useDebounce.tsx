import React, { useState, useEffect } from 'react'

function useDebounce(value: any, delay: number = 500) {
  const [ debouncedValue, setDebouncedValue ] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, value])

  return debouncedValue
}

export default useDebounce