import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class Pie extends Component {
  state = {
    
  }

  componentDidMount() {
    // this.getOption(this.state.data)
  }

  componentWillReceiveProps() {
    
  }

  getOption = () => {
    const data = this.props.data
    const index = this.props.index
    // const dataOption = JSON.parse(JSON.stringify(this.props.dataOption))
    const dataOption = (this.props.dataOption)
    const evaluateData = data[index].evaluate
    dataOption.series[0].data = Object.keys(evaluateData).map(item => {
      return { name: item, value: evaluateData[item] }
    })
    dataOption.series[0].name = data[index].mac1
    return dataOption
  }

  render() { 
    // const { getOption, index } = this.props
    return (
      <ReactEcharts style={{width: '15%'}} option={this.getOption()}></ReactEcharts>
    );
  }
}
 
export default Pie;