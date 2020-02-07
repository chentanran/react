import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class Pie extends Component {
  totalNum = []
  autoNum = []
  manualNum = []
  nameMap = []
  id = ['2019/12/1', '2019/12/2', '2019/12/3', '2019/12/4', '2019/12/5', '2019/12/6', '2019/12/7']
  dataMap = new Map([['a', 'testA'], ['b', 'testB'], ['c', 'testC'], ['d', 'testD'], ['e', 'testE'], ['f', 'testF'], ['g', 'testG']]) 
  TypeMap = []
  state = {
    data: [
        {"timePoint":"2019/12/2","id":"a","totalNum":3,"autoNum":1},
        {"timePoint":"2019/12/3","id":"a","totalNum":3,"autoNum":1},
        {"timePoint":"2019/12/1","id":"b","totalNum":5,"autoNum":2},
        {"timePoint":"2019/12/1","id":"e","totalNum":5,"autoNum":2},
        {"timePoint":"2019/12/3","id":"e","totalNum":8,"autoNum":3},
        {"timePoint":"2019/12/4","id":"c","totalNum":6,"autoNum":2},
        {"timePoint":"2019/12/7","id":"d","totalNum":3,"autoNum":0}
      ]
  }

  componentDidMount() {
    let data = this.state.data
    // 先取出类型
    this.TypeMap = data.map(item => {
      return item.id
    })
    // 去重
    this.TypeMap = [...new Set(this.TypeMap)]
    // 循环得出总数 数据
    for(let i = 0; i < this.TypeMap.length; i++) {
      // 获取名字
      this.nameMap.push(this.dataMap.get(this.TypeMap[i]))
      let dataArr = []
      for(let j = 0; j < this.id.length; j++) {
        let isWeekType = this.getWeekType(this.id[j], this.TypeMap[i])
        if (isWeekType && isWeekType.length > 0) {
          dataArr.push(isWeekType[0].totalNum)
        } else {
          dataArr.push(0)
        }
      }
      this.totalNum.push([...dataArr])
      dataArr.length = 0
    }
  }

  // 获取当天里面的类型
  getWeekType (week,type) {
    let data = this.state.data
    let fit = data.filter(item => {
      return item.timePoint === week && item.id === type
    })
    return fit
  }

  getOption = () => {

    

    let option = {
      title: {
          text: '堆叠区域图'
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data: this.nameMap
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : this.id
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : this.TypeMap.map((item, index) => {
        return {
          name:this.dataMap.get(item),
          type:'line',
          stack: '总量',
          areaStyle: {},
          data: this.totalNum[index]
        }
      })
  };
    return option
  }

  render() { 
    return (
      <ReactEcharts option={this.getOption()}></ReactEcharts>
      // <div>111</div>
    );
  }
}
 
export default Pie;