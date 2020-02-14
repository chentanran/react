import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
import Scroll from '../../components/scroll'
import SongsList from '../../components/SongList'

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true)

  // mock
  const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      // 省略 20 条
    ]
  }

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

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight
    console.log(imageWrapper.current)
    songScrollWrapper.current.style.top = `${h-OFFSET}px`
    initialHeight.current = h
    // 遮罩放下面, 裹住歌曲列表
    layer.current.style.top = `${h-OFFSET}px`
    songScroll.current.refresh()
  }, [])

  const setShowStatusFalse = useCallback (() => {
    setShowStatus (false);
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
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
          <Scroll ref={songScroll}>
            <SongsList
              songs={artist.hotSongs}
              showCollect={false}
            ></SongsList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default memo(Singer)