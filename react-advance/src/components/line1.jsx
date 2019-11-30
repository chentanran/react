import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class Pie extends Component {
  state = {
    data: [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12]
    ],
    dataPercent: [
      [0.1,0.2,0.3,0.4],
      [0.19, 0.23, 0.26, 0.30]
    ]
  }

  componentDidMount() {
    let data = this.state.data
    data.forEach(item => {
      
    })
  }

  getOption = () => {
    const dataPercentdata = this.state.dataPercent
    const data = this.state.data
    // console.log(dataPercentdata)
    return {
      color: ['red', 'blue', 'green', 'pink', 'orange', 'gary', 'yellow'],
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
        },
        formatter: (arr, ticket) => {
          let str = ''
          console.log(arr)
          arr.forEach((item, index) => {
           str += item.marker + item.seriesName + ':' + data[index][item.dataIndex]
           str += index === arr.length -1? '': '<br/>'
          })

          console.log(arr)
          return str
        }
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {  
            type: 'value',  
            axisLabel: {  
                show: true,  
                interval: 'auto',  
                formatter: ((val, index) => {
                  return (val * 100) + '%'
                })
                },  
            show: true  
        }  
    ],
    series : [
          {
              name:'邮件营销',
              type:'line',
              stack: '4',
              areaStyle: {},
              data:dataPercentdata[0]
          },
          {
              name:'联盟广告',
              type:'line',
              stack: '3',
              areaStyle: {},
              data:dataPercentdata[1]
          },
          {
              name:'视频广告',
              type:'line',
              stack: '3',
              areaStyle: {},
              data:dataPercentdata[1]
          }
      ]
    }
  }

  render() { 
    return (
      <ReactEcharts option={this.getOption()}></ReactEcharts>
    );
  }
}
 
export default Pie;