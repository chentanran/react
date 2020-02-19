import React, { memo, useRef, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style'
import { 
  changeShowPlayList, 
  changeCurrentIndex, 
  changePlayMode, 
  changePlayList,
  changeSequecePlayList,
  changeCurrentSong,
  changePlayingState
} from '../store/actionCreators'
import { CSSTransition } from 'react-transition-group'
import { prefixStyle, getName, findIndex, shuffle } from '../../../api/utils'
import { playMode } from '../../../api/config'
import Scroll from '../../../components/scroll'
import { deleteSong } from '../store/actionCreators'
import Confirm from '../../../baseUI/confirm'

function PlayList(props) {
  // redux
  const showPlayList = useSelector(state => state.getIn(['player', 'showPlayList']))
  const currentIndex = useSelector(state => state.getIn(['player', 'currentIndex']))
  const immuCurrentSong = useSelector(state => state.getIn(['player', 'currentSong']))
  const immuPlayList = useSelector(state => state.getIn(['player', 'playList'])) // 播放列表
  const immuSequencePlayList = useSelector(state => state.getIn(['player', 'sequencePlayList'])) // 顺序排列播放列表
  const mode = useSelector(state => state.getIn(['player', 'mode']))

  const currentSong = immuCurrentSong ? immuCurrentSong.toJS() : []
  const playList = immuPlayList ? immuPlayList.toJS() : []
  const sequencePlayList = immuSequencePlayList ? immuSequencePlayList.toJS() : []

  const dispatch = useDispatch()
  // 影藏音乐列表
  const changeShowPlayListDispatch = (data) => {
    dispatch(changeShowPlayList(data))
  }
  // 切换歌曲
  const changeCurrentIndexDispatch = (data) => {
    if (currentIndex === data) return
    dispatch(changeCurrentIndex(data))
  }
  // 修改播放模式
  const changeModeDispatch = (data) => {
    dispatch(changePlayMode(data))
  }
  // 修改歌曲列表
  const changePlayListDispatch = (data) => {
    dispatch(changePlayList(data))
  }
  // 清空
  const handleConfirmClear = () => {
    // 1. 清空两个列表
    dispatch (changePlayList ([]));
    dispatch (changeSequecePlayList ([]));
    // 2. 初始 currentIndex
    dispatch (changeCurrentIndex (-1));
    // 3. 关闭 PlayList 的显示
    dispatch (changeShowPlayList (false));
    // 4. 将当前歌曲置空
    dispatch (changeCurrentSong ({}));
    // 5. 重置播放状态
    dispatch (changePlayingState (false));
  }


  const playListRef = useRef()
  const listWrapperRef = useRef()
  const confirmRef = useRef ()
  const [isShow, setIsShow] = useState(false)
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true)
  const listContentRef = useRef()
  // touchStart 后 记录 y 值
  const [startY, setStartY] = useState(0)
  // touchStart 事件是否已经触发
  const [initialed, setInitialed] = useState(0)
  // 用户下滑的距离
  const [distance, setDistance] = useState(0)

  const transform = prefixStyle('transform')
  // css 进出场控制
  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true)
    // 开始时影藏在下面
    listWrapperRef.current.style[transform] = `translate3d(0,100%,0)`
  }, [transform])

  const onEnteringCB = useCallback(() => {
    // 让列表展示
    listWrapperRef.current.style['transition'] = 'all 0.3s'
    listWrapperRef.current.style[transform] = `translate3d(0,0,0)`
  }, [transform])

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style['transition'] = 'all 0.3s'
    listWrapperRef.current.style[transform] = `translate3d(0,100%,0)`
  }, [transform])

  const onExitedCB = useCallback(() => {
    setIsShow(false)
    listWrapperRef.current.style[transform] = `translate3d(0,100%,0)`
  }, [transform])

  const getCurrentIcon = (item) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;' : '';
    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: content }}></i>
    )
  };
  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i className="iconfont" onClick={(e) => changeMode(e)} dangerouslySetInnerHTML={{ __html: content }}></i>
        <span className="text" onClick={(e) => changeMode(e)}>{text}</span>
      </div>
    )
  };
  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    // 具体逻辑比较复杂 后面来实现
    if (newMode === 0) {
      // s顺序模式
      changePlayListDispatch(sequencePlayList)
      let index = findIndex(currentSong, sequencePlayList)
      changeCurrentIndexDispatch(index)
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList)
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList)
      let index = findIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
    }
    changeModeDispatch(newMode)
  }

  const handleShowClear = () => {
    confirmRef.current.show ();
  }

  const handleTouchStart = (e) => {
    if (!canTouch || initialed) {
      return
    }
    listWrapperRef.current.style['transition'] = ''
    setStartY(e.nativeEvent.touches[0].pageY) // 记录y值
    setInitialed(true)
  }
  const handleTouchMove = (e) => {
    if (!canTouch || !initialed) {
      return
    }
    let distance = e.nativeEvent.touches[0].pageY - startY
    if (distance < 0) {
      return
    }
    setDistance(distance) // 记录下滑距离
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`
  }
  const handleTouchEnd = (e) => {
    setInitialed(false)
    // 阀值为 150
    if (distance >= 150) {
      // 大于150px 则关闭 playList
      changeShowPlayListDispatch(false)
    } else {
      // 否则反弹回去
      listWrapperRef.current.style['transition'] = 'all 0.3s'
      listWrapperRef.current.style[transform] = 'translate3d(0px, 0px, 0px)'
    }
  }

  const handleScroll = pos => {
    let state = pos.y === 0
    setCanTouch(state)
  }

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: 'block' } : { display: 'none' }}
        onClick={() => changeShowPlayListDispatch(false)}
      >
        <div 
          className="list_wrapper" 
          ref={listWrapperRef} 
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll 
              ref={listContentRef}
              onScroll={pos => handleScroll(pos)}
              bounceTop={false}
            >
              <ListContent>
                {
                  playList.map((item, index) => {
                    return (
                      <li className="item" key={item.id} onClick={() => changeCurrentIndexDispatch(index)}>
                        {getCurrentIcon(item)}
                        <span className="text">{item.name} - {getName(item.ar)}</span>
                        <span className="like">
                          <i className="iconfont">&#xe601;</i>
                        </span>
                        <span className="delete">
                          <i className="iconfont">&#xe63d;</i>
                        </span>
                      </li>
                    )
                  })
                }
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否删除全部？"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
          handleConfirm={handleConfirmClear}
        />
      </PlayListWrapper>
    </CSSTransition>
  )
}

export default memo(PlayList)