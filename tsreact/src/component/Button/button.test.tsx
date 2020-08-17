import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonSize, ButtonType, ButtonProps } from './button'

const defaultProps = {
  onClick: jest.fn()
}

const propsButton: ButtonProps = {
  size: ButtonSize.Large,
  btnType: ButtonType.Danger
}

const disabledButton: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test button', () => {
  it('default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it ('props button', () => {
    const wrapper = render(<Button {...propsButton}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-lg btn-danger')
  })
  it ('link button', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element.tagName).toEqual('A')
  })
  it ('disabled button', () => {
    const wrapper = render(<Button {...disabledButton}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledButton.onClick).not.toHaveBeenCalled()
  })
})