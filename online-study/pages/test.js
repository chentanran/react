import React from 'react'
import fetchHelper from '../kits/fetch'

class Test extends React.Component {

  static async getInitialProps() {
    console.log(this.props)
    let res = await fetchHelper.get('/nc/course/courseDetial/getCourseDetial/102')
    console.log(res)
    return {
      // 并且将数据绑定到当前组件的props中
        courseDetial:res.message.CourseDetial.title
    }
  }
  print() {
    console.log(this.props);
  }

  render() {
    const {courseDetial} = this.props
    // console.log(courseDetial)
    console.log(this.props, '---------', courseDetial)
    
    return (
      <div>
        Hello World {this.props.pageProps.courseDetial}
        <div onClick={this.print.bind(this)}>print props</div>
      </div>
    )
  }
}

export default Test