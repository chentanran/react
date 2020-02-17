import React, {useRef} from 'react';
import {getName} from '../../../api/utils';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from '../../../baseUI/progress-circle'

function MiniPlayer (props) {
  const { song, fullScreen } = props
  const { setFullScreen } = props
  const miniPlayerRef = useRef()

  const percent = 0.2

  return (
    <CSSTransition
      in={!fullScreen} 
      timeout={400} 
      classNames="mini" 
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef} onClick={() => setFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            <img className="play" src={song.al.picUrl} width="40" height="40" alt="img"/>
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName (song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            <i className="icon-mini iconfont icon-pause">&#xe650;</i>
          </ProgressCircle> 
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)