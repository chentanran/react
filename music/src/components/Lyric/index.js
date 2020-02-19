// // 解析【00:01:997】 这一类时间戳的正则表达式
// const timeExp = /\[(\d{2,}):(\d[2])(?:\.(\d{2,3}))?]/g
// const START_PAUSE = 0
// const START_PLAYING = 1

// export default class Lyric {
//   /**
//    * @params {string} lrc
//    * @params {function} handle
//    */
//   constructor(lrc, handler = () => {}, speed) {
//     this.lrc = lrc
//     this.lines = [] // 解析后的数组， 包含歌词和时间
//     this.handler = handler // 回调函数
//     this.state = START_PAUSE // 播放状态
//     this.curLineIndex = 0 // 当前播放歌词所在的行数
//     this.startStamp = 0 // 歌曲开始的时间戳
//     this.speed = speed || 1 // 播放速度
//     this._initLines()
//   }
//   // 解析代码
//   _initLines() {
//     const lines = this.lrc.split('\n')
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i]
//       let result = timeExp.exec(line)
//       if (!result) continue
//       const txt = line.replace(timeExp, '').trim() // 去掉时间戳，只剩歌词
//       if (txt) {
//         if (result[3].length === 3) {
//           result[3] = result[3] / 10 // 三位数字变为两位
//         }
//         this.lines.push({
//           time: result[1] * 60 * 1000 + result[2] * 100 + (result[3] || 0) * 10, // 转化为毫秒
//           txt
//         })
//       }
//     }
//     console.log(this.lines)
//     // 根据时间排序
//     this.lines.sort((a,b) => {
//       return a.time - b.time
//     })
//   }
//   // 开始播放
//   //offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
//   play(offset=0, isSeek=false) {
//     if (!this.lines.length) {
//       return
//     }
//     this.state = START_PLAYING
//     // 找出当前所在行
//     this.currentIndex = this._findcurLineIndex(offset)
//     // 传递歌词信息
//     this._callHandler(this.curLineIndex - 1)
//     // 根据时间进度 判断歌词开始的时间戳
//     this.startStamp = +new Date() - offset
//     if (this.curLineIndex < this.lines.length) {
//       clearTimeout(this.timer)
//       // 继续播放
//       this._playRest(isSeek)
//     }
//   }
//   //
//   _findcurLineIndex(time) {
//     for (let i = 0; i < this.lines.length; i++) {
//       if (time < this.lines[i].time) {
//         return i
//       }
//     }
//     return this.lines.length - 1
//   }
//   //
//   _callHandler(i) {
//     if (i < 0) {
//       return
//     }
//     this.handler({
//       txt: this.lines[i].txt,
//       lineNum: i
//     })
//   }
//   // 继续播放
//   // isSeek 标志位表示用户是否手动调整进度
//   _playRest(isSeek=false) {
//     let line = this.lines[this.curLineIndex]
//     let delay
//     if (isSeek) {
//       delay = line.time - (+new Date() - this.startStamp)
//     } else {
//       // 拿到上一行的歌词开始时间， 算间隔
//       let preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0
//       delay = line.time - preTime
//     }
//     this.timer = setTimeout(() => {
//       this._callHandler(this.curLineIndex++)
//       if (this.curLineIndex < this.lines.length && this.state === START_PLAYING) {
//         this._playRest()
//       }
//     }, (delay / this.speed))
//   }

//   changeSpeed(speed) {
//     this.speed = speed;
//   }
//   // 暂停和播放
//   togglePlay(offset) {
//     if (this.state === START_PLAYING) {
//       this.stop()
//     } else {
//       this.state = START_PLAYING
//       this.play(offset, true)
//     }
//   }
//   stop() {
//     this.state = START_PAUSE
//     clearTimeout(this.timer)
//   }
//   // 切换到某个时间点播放
//   seek(offset) {
//     this.play(offset, true)
//   }
// }

/**version:1.0.0
 * 传入歌词，按照正则表达式解析
 * 解析的数据结构为：
 * {
 *   txt:歌词，
 *   time:ms
 * }
 */

const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const STATE_PAUSE = 0
const STATE_PLAYING = 1

const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
}

function noop() {
}

export default class Lyric {
  constructor(lrc, hanlder = noop, speed = 1) {
    this.lrc = lrc
    this.tags = {}
    this.lines = []
    this.handler = hanlder
    this.state = STATE_PAUSE
    this.curLineIndex = 0
    this.speed = speed
    this.offset = 0

    this._init()
  }

  _init() {
    this._initTag()

    this._initLines()
  }

  _initTag() {
    for (let tag in tagRegMap) {
      const matches = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i'))
      this.tags[tag] = matches && (matches[1] || '')
    }
  }

  _initLines() {
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let result = timeExp.exec(line)
      if (result) {
        const txt = line.replace(timeExp, '').trim();
        if (txt) {
          if (result[3].length === 3) {
            result[3] = result[3]/10;
          }
          this.lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
            txt
          })
        }
      }
    }

    this.lines.sort((a, b) => {
      return a.time - b.time
    })

  }

  _findcurLineIndex(time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  _callHandler(i) {
    if (i < 0) {
      return
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i
    })
  }

  _playRest(isSeek=false) {
    let line = this.lines[this.curLineIndex]
    let delay;
    if(isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    }else {
      //拿到上一行的歌词开始时间，算间隔
      let preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++)
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest()
      }
    }, (delay / this.speed))
  }

  changeSpeed(speed) {
    this.speed = speed;
  }

  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return
    }
    this.state = STATE_PLAYING

    this.curLineIndex = this._findcurLineIndex(offset)
    //现在正处于第this.curLineIndex-1行
    this._callHandler(this.curLineIndex-1)
    this.offset = offset
    this.startStamp = +new Date() - offset

    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer)
      this._playRest(isSeek)
    }
  }

  togglePlay(offset) {
    if (this.state === STATE_PLAYING) {
      this.stop()
      this.offset = offset
    } else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }

  stop() {
    this.state = STATE_PAUSE
    this.offset = 0
    clearTimeout(this.timer)
  }

  seek(offset) {
    this.play(offset, true)
  }
}
