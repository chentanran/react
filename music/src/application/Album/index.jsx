import React, { memo, useState, useRef, useEffect, useCallback } from 'react'
import { Container, Menu, TopDesc } from './style'
import { CSSTransition } from 'react-transition-group'
import { withRouter } from 'react-router'
import Header from '../../baseUI/header/index'
import Scroll from '../../components/scroll/index'
// import { getName, getCount } from '../../api/utils'
import style from '../../assets/global-style'
import { HEADER_HEIGHT } from '../../api/config'
import { useSelector, useDispatch } from 'react-redux'
import { getAlbumList, changeEnterLoading } from './store/actionCreators'
import { isEmptyObject } from '../../api/utils'
import Loading from '../../baseUI/loading'
import SongsList from '../../components/SongList'
import MusicNote from '../../baseUI/music-note'

function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [isMarquee, setIsMarquee] = useState(false)
  const [title, setTitle] = useState('返回')

  const headerEl = useRef()
  const musicNoteRef = useRef ()

  //mock 数据
  // const currentAlbum = {
  //   creator: {
  //     avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
  //     nickname: "浪里推舟"
  //   },
  //   coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
  //   subscribedCount: 2010711,
  //   name: "听完就睡，耳机是天黑以后柔软的梦境",
  //   tracks: [
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{ name: "张学友" }, { name: "周华健" }],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //   ]
  // }

  //
  const currentAlbum = useSelector(state => state.getIn(['album', 'currentAlbum']))
  const enterLoading = useSelector(state => state.getIn(['album', 'enterLoading']))

  const currentAlbumJS = currentAlbum ? currentAlbum.toJS() : {}
  // 判断歌曲列表长度
  const songsCount = useSelector(state => state.getIn(['player', 'playList'])).size

  const dispatch = useDispatch()
  const id = props.match.params.id
  
  useEffect(() => {
    dispatch(getAlbumList(id))
    dispatch(changeEnterLoading(true))
  }, [dispatch, id])

  //
  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT
    let percent = Math.abs(pos.y / minScrollY)
    let headerDom = headerEl.current
    // 划过顶部高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.background = style['theme-color']
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
      setTitle(currentAlbumJS.name)
      setIsMarquee(true)
    } else {
      headerDom.style.background = ''
      headerDom.style.opacity = 1
      setTitle('歌单')
      setIsMarquee(false)
    }
  }, [currentAlbumJS])

  const handleClick = useCallback(() => {
    setShowStatus(false)
  }, [])

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation ({ x, y });
  }

  // ui
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbumJS.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbumJS.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbumJS.subscribedCount / 1000) / 10} 万 </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbumJS.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbumJS.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbumJS.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
              </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
              </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
              </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
              </div>
      </Menu>
    )
  }

  // const renderSongList = () => {
  //   return (
  //     <SongList>
  //       <div className="first_line">
  //         <div className="play_all">
  //           <i className="iconfont">&#xe6e3;</i>
  //           <span > 播放全部 <span className="sum">(共 {currentAlbumJS.tracks.length} 首)</span></span>
  //         </div>
  //         <div className="add_list">
  //           <i className="iconfont">&#xe62d;</i>
  //           <span > 收藏 ({getCount(currentAlbumJS.subscribedCount)})</span>
  //         </div>
  //       </div>
  //       <SongItem>
  //         {
  //           currentAlbumJS.tracks.map((item, index) => {
  //             return (
  //               <li key={index}>
  //                 <span className="index">{index + 1}</span>
  //                 <div className="info">
  //                   <span>{item.name}</span>
  //                   <span>
  //                     {getName(item.ar)} - {item.al.name}
  //                   </span>
  //                 </div>
  //               </li>
  //             )
  //           })
  //         }
  //       </SongItem>
  //     </SongList>
  //   )
  // }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container play={songsCount}>
        <Header ref={headerEl} title={title} handleClick={handleClick} isMarquee={isMarquee}></Header>
        {
          !isEmptyObject(currentAlbumJS) ? (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                { renderTopDesc() }
                { renderMenu() }
                {/* // */}
                {/* { renderSongList() } */}
                <SongsList
                 showCollect={true}
                 songs={currentAlbumJS.tracks}
                 collectCount={currentAlbumJS.subscribedCount}
                 musicAnimation={musicAnimation}
                 showBackground={true}
                ></SongsList>
              </div>
            </Scroll>
          ) : null
        }
        {
          enterLoading ? <Loading></Loading> : null
        }
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

export default memo(withRouter(Album))