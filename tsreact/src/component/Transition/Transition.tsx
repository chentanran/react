import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'

interface TransitionPropsName {
  animation?: AnimationName,
  wrapper?: boolean
}

type TransitionProps = CSSTransitionProps & TransitionPropsName

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    animation,
    classNames,
    wrapper,
    ...resetProps
  } = props

  return (
    <CSSTransition
      classNames={ classNames ? classNames : animation }
      {...resetProps}
    >
     {wrapper ? <div>{children}</div> : children} 
    </CSSTransition>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true
}

export default Transition