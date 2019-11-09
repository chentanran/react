import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class Pie extends Component {
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
        mac1: 'oppo',
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
        mac1: '锤子',
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
    ]
  }

  componentDidMount() {
    // this.getOption(this.state.data)
  }

  getOption = () => {
    const data = this.state.data
    return {
      color: ['red', 'blue', 'green', 'pink', 'orange', 'gary', 'yellow'],
      title : {
          text: '南丁格尔玫瑰图',
          subtext: '纯属虚构',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          x : 'center',
          y : 'bottom',
          data:  Object.keys(data[0].evaluate)
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                  show: true,
                  type: ['pie', 'funnel']
              },
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      series : data.map((item, index) => {
        return {
              name: item.mac1,
              type:'pie',
              radius : [20, 80],
              center : [`${(index + 1) * 15}%`, '50%'],
              // roseType : 'radius',
              label: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              lableLine: {
                  normal: {
                      show: false
                  },
                  emphasis: {
                      show: true
                  }
              },
              data: Object.keys(item.evaluate).map(eva => {
                return { value: item.evaluate[eva], name: eva }
              })
          }
      }),
      graphic: data.map((item, index) => {
        return {
          type: 'text',
          id: item.mac1,
          position: ['20%', '50%'],
          left: '22%',
          top: '30%',
          style: {
            text: item.mac1,
            x: (index + 1) * 185,
            y: 240
          }
        }
      })
    }
  }

  render() { 
    return (
      <ReactEcharts option={this.getOption()}></ReactEcharts>
    );
  }
}
 
export default Pie;