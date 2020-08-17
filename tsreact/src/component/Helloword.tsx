import React from 'react'
import useMouse from './useMouse'

interface IHelloProps {
  message?: string
}

const Helloword: React.FC<IHelloProps> = (props) => {
  const position = useMouse()
  return (
    <>
      <h1>{ props.message }</h1>
      <h1>x: { position.x }, y: { position.y }</h1>
    </>
    
  )
}

Helloword.defaultProps = {
  message: '娃哈哈真好喝'
}

export default Helloword