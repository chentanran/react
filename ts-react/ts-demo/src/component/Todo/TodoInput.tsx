import React from 'react'
// import { TodoInputProps, todoInputDefaultProps, Props } from './props.type'

// interface Props {
//   handleSubmit: (value: string) => void
// }

interface State {
  itemText: string
}

const todoInputDefaultProps = {
  inputSetting: {
    maxLength: 20,
    placeholder: '请输入todo'
  }
}

// Partial的作用就是将类型的属性全部变成可选的,也就是下面这种情况：
type Props = {
  handleSubmit: (value: string) => void
  children: React.ReactNode
} & Partial<typeof todoInputDefaultProps>

export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
  return <P extends Partial<DP>>(props: P) => {
    type PropsExcludingDefaults = Omit<P, keyof DP>
    type RecomposedProps = DP & PropsExcludingDefaults

    return (props as any) as RecomposedProps
  }
}

const getProps = createPropsGetter(todoInputDefaultProps)

export class TodoInput extends React.Component<Props, State> {
  public static defaultProps = todoInputDefaultProps
  constructor(props: Props) {
    super(props)
    this.state = {
      itemText: ''
    }
  }

  private inputRef = React.createRef<HTMLInputElement>()

  private updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemText: e.target.value
    })
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!this.state.itemText.trim()) {
      return
    }
    this.props.handleSubmit(this.state.itemText)
    this.setState({
      itemText: ''
    })
  }

  render() {
    const { inputSetting } = getProps(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={this.inputRef}
          className="edit"
          maxLength={inputSetting.maxLength}
          value={this.state.itemText}
          onChange={this.updateValue}
        />
      </form>
    )
  }
}