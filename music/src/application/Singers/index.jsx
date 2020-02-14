import React, { memo, useEffect, useContext } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import styled from 'styled-components'
import { ListContainer, List, ListItem } from './style'
import Scroll from '../../components/scroll'
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../baseUI/loading/index'
import  LazyLoad, {forceCheck} from 'react-lazyload'
import { CategoryDataContext, CHANGE_CATEGORY, CHANGE_ALPHA } from './data'
import { renderRoutes } from 'react-router-config'

export const NavContainer  = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`

function Singers(props) {
  // let [category, setCategory] = useState('')
  // let [alpha, setAlpha] = useState('')

  const { data, dispatch:isuseDispatch } = useContext(CategoryDataContext)
  const { category, alpha } = data.toJS()
  //mock 数据
  // const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
  //   return {
  //     picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
  //     name: "隔壁老樊",
  //     accountId: 277313426,
  //   }
  // })

  // props
  const singerList = useSelector(state => state.getIn(['singers', 'singerList']))
  const enterLoading = useSelector(state => state.getIn(['singers', 'enterLoading']))
  const pullUpLoading = useSelector(state => state.getIn(['singers', 'pullUpLoading']))
  const pullDownLoading = useSelector(state => state.getIn(['singers', 'pullDownLoading']))
  const pageCount = useSelector(state => state.getIn(['singers', 'pageCount']))

  const singerListJS = singerList ? singerList.toJS() : []
  // dispatch
  const dispatch = useDispatch()

  useEffect(() => {
    if (!singerList.size) {
    // 热门歌手
    dispatch(getHotSingerList())
    }
  }, [singerList.size, dispatch])

  // 按名称或类型搜索
  const updateDispatch = (category, alpha) => {
    dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(getSingerList(category, alpha));
  }
  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = (category, alpha, hot, count) => {
    dispatch(changePullUpLoading(true))
    dispatch(changePageCount(count+1))
    if(hot){
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreSingerList(category, alpha))
    }
  }
  //顶部下拉刷新
  const pullDownRefreshDispatch = (category, alpha) => {
    dispatch(changePullDownLoading(true))
    dispatch(changePageCount(0)) // 属于重新获取数据
    if(category === '' && alpha === ''){
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList(category, alpha))
    }
  }

  const handleUpdateAlpha = (val) => {
    // setAlpha(val)
    isuseDispatch({ type: CHANGE_ALPHA, data: val })
    updateDispatch(category, val)
  }

  const handleUpdateCatetory = (val) => {
    // setCategory(val)
    isuseDispatch({ type: CHANGE_CATEGORY, data: val })
    updateDispatch(val, alpha)
  }
  // 上拉
  const handlePullUp = () => {
    pullUpRefreshDispatch (category, alpha, category === '', pageCount)
  }
  // 下拉
  const handlePullDown = () => {
    pullDownRefreshDispatch (category, alpha)
  }

  // 去详情页
  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`)
  }

  const renderSingerList = () => {
    return (
      <List>
        {
          singerListJS.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen 
          list={categoryTypes} 
          title={'分类(默认热门)'}
          handleClick={(val) => handleUpdateCatetory (val)}
          oldVal={category}></Horizen>
        <Horizen 
          list={alphaTypes} 
          title={"首字母:"}
          handleClick={val => handleUpdateAlpha (val)}
          oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
          onScroll={forceCheck}>
          { renderSingerList() }
        </Scroll>
        {
          enterLoading ? <Loading></Loading> : null  
        }
      </ListContainer>
      { renderRoutes(props.route.routes) }
    </div>
  )
}

export default memo(Singers)
