import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRankList } from './store/index'
import { filterIndex } from '../../api/utils'
import { List, Container, ListItem, SongList } from './style'
import Scroll from '../../components/scroll/index'
import { renderRoutes } from 'react-router-config'
import Loading from '../../baseUI/loading/index'
import { EnterLoading } from '../Singers/style'

function Rank(props) {
  const rankList = useSelector(state => state.getIn(['rank', 'rankList']))
  const loading = useSelector(state => state.getIn(['rank', 'loading']))

  const rankListJS = rankList ? rankList.toJS() : []

  // 判断歌曲列表长度
  const songsCount = useSelector(state => state.getIn(['player', 'playList'])).size
  
  const globalStateIndex = filterIndex(rankListJS)
  const officialList = rankListJS.slice(0, globalStateIndex)
  const globalList = rankListJS.slice(globalStateIndex)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRankList())
  }, [dispatch])

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }

  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
        list.map ((item) => {
          return (
            <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""/>
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              { renderSongList(item.tracks)  }
            </ListItem>
          )
        })
      } 
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map ((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  // 榜单数据未加载出来之前都给隐藏
  const displayStyle = loading ? {"display":"none"}:  {"display": ""}

  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
            { renderRankList (officialList) }
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
            { renderRankList (globalList, true) }
          { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll> 
      {renderRoutes(props.route.routes)}
    </Container>
  )
}

export default memo(Rank)
