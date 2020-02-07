import React from 'react'

function CountView(props) {
  return (
    <div> 
      <button onClick={props.onDecrement}>-</button>
      <button onClick={props.onIncrement}>+</button>
      <p>{props.count} + {props.caption}</p>
    </div>
  )
}

export default CountView