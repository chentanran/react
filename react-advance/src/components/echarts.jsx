import React, { Component } from 'react'
import Pie from './pie'

class EchartsPie extends Component {
  state = { 
    data: [
      {
        mac1: '小米',
        evaluate: {
          evaluate1: 0,
          evaluate2: 10,
          evaluate3: 20,
          evaluate4: 30,
          evaluate5: 40,
          evaluate6: 50,
          evaluate7: 60,
        }
      },
      {
        mac1: '华为',
        evaluate: {
          evaluate1: 20,
          evaluate2: 10,
          evaluate3: 30,
          evaluate4: 60,
          evaluate5: 40,
          evaluate6: 30,
          evaluate7: 10,
        }
      },
      {
        mac1: 'iphone',
        evaluate: {
          evaluate1: 30,
          evaluate2: 10,
          evaluate3: 70,
          evaluate4: 40,
          evaluate5: 20,
          evaluate6: 10,
          evaluate7: 10,
        }
      },
      {
        mac1: 'vivo',
        evaluate: {
          evaluate1: 0,
          evaluate2: 10,
          evaluate3: 20,
          evaluate4: 30,
          evaluate5: 40,
          evaluate6: 50,
          evaluate7: 60,
        }
      },
      {
        mac1: 'oppo',
        evaluate: {
          evaluate1: 50,
          evaluate2: 60,
          evaluate3: 70,
          evaluate4: 20,
          evaluate5: 30,
          evaluate6: 40,
          evaluate7: 10,
        }
      },
      {
        mac1: '锤子',
        evaluate: {
          evaluate1: 10,
          evaluate2: 30,
          evaluate3: 74,
          evaluate4: 45,
          evaluate5: 23,
          evaluate6: 11,
          evaluate7: 12,
        }
      },
    ],
    dataOption: {
      color: ['red', 'blue', 'green', 'pink', 'orange', 'gary', 'yellow'],
      // title : {
      //     text: '某站点用户访问来源',
      //     subtext: '纯属虚构',
      //     x:'center'
      // },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    }
  }

  render() { 
    return (
      <div>
        <div style={{display:'flex'}}>
          {
            this.state.data.map((item, index) => {
              return <Pie key={index} data={this.state.data} index={index} dataOption={this.state.dataOption}></Pie>
            })
          }
        </div>
      </div>
      
    )
  }
}
 
export default EchartsPie;