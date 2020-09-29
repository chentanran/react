import { useEffect, RefObject } from 'react'

function useClickOutSide(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listen = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }

    document.addEventListener('click', listen)
    
    return () => {
      document.removeEventListener('click', listen)
    }
  }, [ref, handler])
}

export default useClickOutSide