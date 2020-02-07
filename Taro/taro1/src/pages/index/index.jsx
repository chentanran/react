import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Child from './child'
// import { connect } from '@tarojs/redux'

// import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'


// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
// class Index extends Component {

//     config = {
//     navigationBarTitleText: '首页'
//   }

//   componentWillReceiveProps (nextProps) {
//     console.log(this.props, nextProps)
//   }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <Button className='add_btn' onClick={this.props.add}>+</Button>
//         <Button className='dec_btn' onClick={this.props.dec}>-</Button>
//         <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
//         <View><Text>{this.props.counter.num}</Text></View>
//         <View><Text>Hello, World</Text></View>
//       </View>
//     )
//   }
// }
function Index() {
  const [userName ,setUserName] = useState('Hello World!!!!')
  const [pageIndex, setPageIndex] = useState('')
  useEffect(() => {
    setPageIndex(this.$router.params.pageIndex)
  },[])
  return (
    <View>
        <Text>{userName}</Text>
        <Text>{pageIndex}</Text>
        <Child userName={userName}></Child>
    </View>
  )
}

export default Index
