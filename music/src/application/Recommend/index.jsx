import React, { memo, useEffect } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/recommendList'
import Scroll from '../../components/scroll'
import { Content } from './style'
import * as actionTypes from './store/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/loading/index'
import { renderRoutes } from 'react-router-config'

function Recommend(props) {
  // mock
  // const bannerList = [1,2,3,4].map(item => {
  //   return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  // })

  // const recommendList = [1,2,3,4,5,6,7,8,9,10].map (item => {
  //   return {
  //     id: 1,
  //     picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //     playCount: 17171122,
  //     name: "朴树、许巍、李健、郑钧、老狼、赵雷"
  //   }
  // })

  // const { bannerList, recommendList } = props
  // const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  // const bannerListJS = bannerList ? bannerList.toJS () : []
  // const recommendListJS = recommendList ? recommendList.toJS () : []

  const bannerList = useSelector(state => state.getIn(['recommend', 'bannerList']))
  const recommendList = useSelector(state => state.getIn(['recommend', 'recommendList']))
  const enterLoading = useSelector(state => state.getIn(['recommend', 'enterLoading']))

  const bannerListJS = bannerList ? bannerList.toJS () : []
  const recommendListJS = recommendList ? recommendList.toJS () : []

  const dispatch = useDispatch()
  // 判断歌曲列表长度
  const songsCount = useSelector(state => state.getIn(['player', 'playList'])).size

  // useEffect(() => {
  //   getBannerDataDispatch()
  //   getRecommendListDataDispatch()
  // }, [getBannerDataDispatch, getRecommendListDataDispatch])

  useEffect(() => {
    if (!bannerList.size) {
      dispatch(actionTypes.getBannerList())
    }
    if (!recommendList.size) {
      dispatch(actionTypes.getRecommendList())
    }
  }, [bannerList.size, recommendList.size, dispatch])

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {
        enterLoading ? <Loading></Loading> : null
      }
      {
        renderRoutes(props.route.routes)
      }
    </Content>
  )
}

// const mapStateToprops = (state) => ({
//   // 不要在这里将数据 toJS
//   // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
//   bannerList: state.getIn(['recommend', 'bannerList']),
//   recommendList: state.getIn(['recommend', 'recommendList'])
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBannerDataDispatch() {
//       dispatch(actionTypes.getBannerList())
//     },
//     getRecommendListDataDispatch() {
//       dispatch(actionTypes.getRecommendList())
//     }
//   }
// }

// export default connect(mapStateToprops, mapDispatchToProps)(memo(Recommend))
export default memo(Recommend)
