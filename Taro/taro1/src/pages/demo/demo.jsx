import Taro, {useState} from '@tarojs/taro'
import {View, Text, Button, Image} from '@tarojs/components'
import {demo1, demo2} from '../../tools/tool'
import img1 from '../../static/img/kt1.jpg'

function Demo() {
  demo1()
  demo2()
  const list = [
    {id: 1, name: '张三'},
    {id: 2, name: '李四'},
    {id: 3, name: '王五'}
  ]
  const flag = true
  const [pageIndex, setPageIndex] = useState('娃哈哈')
  const gotoIndex = () => {
    Taro.navigateTo({url: '/pages/index/index?pageIndex='+pageIndex})
  }
  const requestData = () => {
    Taro.request({
      url: 'https://apiblog.jspang.com/default/getArticleList'
    }).then(res => {
      console.log(res)
    })
  }
  return (
    <View>
      <Text>123</Text>
      <Image src={img1}></Image>
      <Image src={require('../../static/img/kt1.jpg')}></Image>
      {
        list.map((item, index) => {
          return (
          <View key={index}>{item.name}</View>
          )
        })
      }
      {
        flag ? '男' : '女'
      }
      <Button onClick={gotoIndex}>点点</Button>
      <Button onClick={requestData}>点点</Button>
    </View>
  )
}

export default Demo