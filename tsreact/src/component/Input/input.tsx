import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  // 添加前缀
  prepand?: string | ReactElement;
  // 添加后缀
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = props => {
  const {
    disabled,
    size,
    icon,
    prepand,
    append,
    style,
    ...restProps
  } = props

  const cnames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepand || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepand
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  
  return (
    <div className={cnames} style={style}>
      {prepand && <div className="viking-input-group-prepend">{prepand}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input
