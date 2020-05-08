import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import axios from 'axios'
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'

const Detailed = (props) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true, // 启动类似Github样式的Markdown
    pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
    sanitize: false, // 原始输出，忽略HTML标签
    tables: true, // 支持Github形式的表格，必须打开gfm选项
    breaks: false, // 支持Github换行符，必须打开gfm选项
    smartLists: true, // 优化列表输出，
    smartypants: false,
    highlight: function (code) { // 高亮显示规则
      return hljs.highlightAuto(code).value;
    }
  })
  let html = marked(props.article_content)
  // nav导航栏
  let articleContent=props.article_content
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {props.title}
                </div>
              <div className="list-icon center">
                <span><CalendarOutlined />{props.addTime}</span>
                <span><FolderOutlined />{props.typeName}</span>
                <span><FireOutlined/>{props.view_count}人</span>
              </div>
              <div className="detailed-content" 
                dangerouslySetInnerHTML={{__html: html}}
              >
                </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async(context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleById + id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed