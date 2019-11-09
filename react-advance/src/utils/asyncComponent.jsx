import React, {Component} from 'react'

export default function AsyncComponent(importComponent) {
  class AsyncComponent extends Component {
    state = { 
      component: null
    }

    componentDidMount() {
      importComponent().then((mod) => {
        this.setState({
          component: mod.defult ? mod.defult : mod
        })
      })
    }

    render() { 
      // 渲染动态加载的组件
      const C = this.state.component
      return C ? <C {...this.props}></C> : null
    }
  }
   
  return AsyncComponent;
}