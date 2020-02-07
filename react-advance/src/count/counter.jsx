import { observable } from 'mobx'
import { observer } from 'mobx-react'
import CountView from './CountView'
import React, {Component} from 'react'

const store = observable({
  count: 0
})

store.onIncrement = () => {
  this.count++
}

store.onDecrement = () => {
  this.count--
}

@observer
class Count extends Component {
  @observable count = 0

  onIncrement = () => {
    store.onIncrement()
  }
  
  onDecrement = () => {
    store.onDecrement()
  }
  render() { 
    return ( 
      <CountView caption="with decorator" count={store.count} onDecrement={this.onDecrement} onIncrement={this.onIncrement}>
      </CountView>
    )
  }
}
 
export default Count;