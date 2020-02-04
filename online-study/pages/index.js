import React from 'react'
import Head from 'next/head'
import CSS from '../public/css/home.less'
import { Button } from 'antd'
import { connect } from 'react-redux'

import fetchHelper from '../kits/fetch'

class Home extends React.Component {
  state = {
    blist: null
  }
  componentWillMount() {
    let url = '/nc/course/courseDetial/getCourseDetial/102'
    fetchHelper.get(url).then(res => {
      console.log(res)
      this.setState({
        blist: res.message.BreadCrumbs
      })
    })
  }

  // static async getInitialProps(){
  //   let res = await fetchHelper.get('/nc/course/courseDetial/getCourseDetial/102')
  //   return {
  //     // 并且将数据绑定到当前组件的props中
  //       courseDetial:res.message.CourseDetial
  //   }
  // }
  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={CSS.w}>
          <h1 style={{ color: this.props.testReducer.color }}>Welcome to Next.js!</h1>
          <p className="description">
            To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
          {
            this.state.blist && this.state.blist.map(item => (
            <span key={item.id}>{item.title}</span>
            ))
          }
          {/* <p>{JSON.stringify(this.props.courseDetial)}</p> */}
          <div className="row">
            <a href="https://nextjs.org/docs" className="card">
              <h3>Documentation &rarr;</h3>
              <p>Learn more about Next.js in the documentation.</p>
            </a>
            <a href="https://nextjs.org/learn" className="card">
              <h3>Next.js Learn &rarr;</h3>
              <p>Learn about Next.js by following an interactive tutorial!</p>
            </a>
            <a
              href="https://github.com/zeit/next.js/tree/master/examples"
              className="card"
            >
              <h3>Examples &rarr;</h3>
              <p>Find other example boilerplates on the Next.js GitHub.</p>
            </a>
          </div>
          <Button type="primary">搜索</Button>
          <Button type="danger">搜索</Button>
        </div>

        <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(stateToProps, null)(Home)
