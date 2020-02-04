import css from './layout.less'
import { Icon, Badge } from 'antd'
import {connect} from 'react-redux'

class top extends React.Component {
  render() {
    return <header className={css.headtop + " w"}>
      <a href="" className="fl"><img src="/img/asset-logoIco.png" alt="" /></a>
      <div className={css.left + " fl"}>
        <a className={css.a} href="">首页</a>
        <a className={css.a} href="">课程</a>
        <a className={css.a} href="">职业规划</a>
      </div>
      <div className={css.input + " fl"}>
        <input type="text" className="fl" placeholder="输入查询关键字" />
        <button className="fr">搜索</button>
      </div>
      <div className={css.right + " fr"}>
        <div className={css.signin}>
          <a href="#" onClick={() => this.props.changeColor('red')}>红</a>
          <a href="#" onClick={() => this.props.changeColor('blue')}>蓝</a>
          <Badge count={5}>
            <a href="#">
              <Icon type="shopping-cart" style={{ fontSize: '25px' }} />
            </a>
          </Badge>
          {/* <!-- 未登录 -->*/}
          {/* <a href="#">登录 </a> <span> |</span> <a href="#"> 注册</a> */}
          {/* <!-- 登录 --> */}
          <a href="#" ><Icon type="bell" theme="twoTone" />个人中心</a>
          <a href="#" ><img src="/img/asset-myImg.jpg" alt="" />18665765432</a>
        </div>
      </div>
    </header>

  }
}

// dispatch
const dispatchToProps = (dispatch) => {
  return {
    changeColor: (color) => {
      dispatch({type: 'CHANGE_COLOR', color: color})
    }
  }
}

export default connect(null, dispatchToProps)(top)