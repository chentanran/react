import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
import Scroll from '../../components/scroll'
import SongsList from '../../components/SongList'
import { HEADER_HEIGHT } from '../../api/config'
import { useSelector, useDispatch } from 'react-redux'
import { changeEnterLoading, getSingerInfo } from './store/actionCreator'
import Loading from '../../baseUI/loading/index'
import MusicNote from '../../baseUI/music-note'

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)

  const artistImmu = useSelector(state => state.getIn(['singer', 'artist']))
  const songsImmu = useSelector(state => state.getIn(['singer', 'songsOfArtist']))
  const loading = useSelector(state => state.getIn(['singer', 'loading']))

  const artist = artistImmu ? artistImmu.toJS() : {}
  const songs = songsImmu ? songsImmu.toJS() : []

  // 判断歌曲列表长度
  const songsCount = useSelector(state => state.getIn(['player', 'playList'])).size

  const dispatch = useDispatch()
  const id = props.match.params.id
  useEffect(() => {
    dispatch(changeEnterLoading(true))
    dispatch(getSingerInfo(id))
  }, [dispatch, id])

  // mock
  // const artist = {
  //   picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  //   name: "薛之谦",
  //   hotSongs: [
  //     {
  //       name: "我好像在哪见过你",
  //       ar: [{ name: "薛之谦" }],
  //       al: {
  //         name: "薛之谦专辑"
  //       }
  //     },
  //     {
  //       name: "我好像在哪见过你",
  //       ar: [{ name: "薛之谦" }],
  //       al: {
  //         name: "薛之谦专辑"
  //       }
  //     },
  //     // 省略 20 条
  //   ]
  // }

  const songScroll = useRef()
  const collectButton = useRef()
  const imageWrapper = useRef()
  const songScrollWrapper = useRef()
  const header = useRef()
  const layer = useRef()
  // 图片初始高度
  const initialHeight = useRef(0)
  // 往上偏移尺寸, 露出圆角
  const OFFSET = 5
  // music-note
  const musicNoteRef = useRef()

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h-OFFSET}px`
    initialHeight.current = h
    // 遮罩放下面, 裹住歌曲列表
    layer.current.style.top = `${h-OFFSET}px`
    songScroll.current.refresh()
  }, [])
  //
  const setShowStatusFalse = useCallback (() => {
    setShowStatus (false);
  }, [])

  const handleScroll = useCallback((pos) => {
    const height = initialHeight.current
    const newY = pos.y
    const imageDOM = imageWrapper.current
    const buttonDOM = collectButton.current
    const headerDOM = header.current
    const layerDOM = layer.current
    const minScrollY = -(height-OFFSET) + HEADER_HEIGHT
    // 滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height)
    // 往下拉
    // console.log(newY, minScrollY, percent)
    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`
      layerDOM.style.top = `${height - OFFSET + newY}px`
    } else if (newY >= minScrollY) { // 往上滑动
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`
      // 提高层级
      layerDOM.style.zIndex = 1
      imageDOM.style.paddingTop = '75%'
      imageDOM.style.height = 0
      imageDOM.style.zIndex = -1
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`
      buttonDOM.style['opacity'] = `${1 - percent * 2}`
    } else if (newY < minScrollY) {
      // 往上滑动，超过header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerDOM.style.zIndex = 1
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100
      // 图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`
      imageDOM.style.paddingTop = 0
      imageDOM.style.zIndex = 99
    }
  },[])

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({x, y})
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container play={songsCount}>
        <Header title={"头部"} ref={header} handleClick={setShowStatusFalse}></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
        {
          loading ? <Loading></Loading> : null
        }
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

export default memo(Singer)