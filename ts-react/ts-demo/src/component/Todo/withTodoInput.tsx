import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

const hocProps = {
  inputSetting: {
    maxLength: 30,
    placeholder: '请输入代办事项'
  }
}

type InjectedProps = Partial<typeof hocProps>

export const withTodoInput = <P extends InjectedProps>(UnwrappedComponent: React.ComponentType<P>) => {
  type Props = Omit<P, keyof InjectedProps>

  class WithToggleable extends React.Component<Props> {
    public static readonly UnwrappedComponent = UnwrappedComponent
    render () {
      return (
        <UnwrappedComponent
          inputSetting={hocProps}
          {...this.props as P}
        />
      )
    }
  }
  return hoistNonReactStatics(WithToggleable, UnwrappedComponent)
}