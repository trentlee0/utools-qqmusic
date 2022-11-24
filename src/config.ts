import {NoneTemplate, NormalListTemplate} from './util/templates'
import * as music from './util/music'

export const none: Array<NoneTemplate> = [
  {
    code: 'qq-play-pause',
    title: 'Play Pause',
    description: '开始或暂停播放',
    icon: 'icon/logo.png',
    action: () => music.playPause()
  },
  {
    code: 'qq-prev',
    title: 'Previous',
    description: '上一首',
    icon: 'icon/logo.png',
    action: () => music.prev()
  },
  {
    code: 'qq-next',
    title: 'Next',
    description: '下一首',
    icon: 'icon/logo.png',
    action: () => music.next()
  },
  {
    code: 'qq-like',
    title: 'Like',
    description: '喜欢歌曲',
    icon: 'icon/logo.png',
    action: () => music.like()
  },
  {
    code: 'qq-up',
    title: 'Volume Up',
    description: '音量加',
    icon: 'icon/logo.png',
    action: () => music.volumeUp()
  },
  {
    code: 'qq-down',
    title: 'Volume Down',
    description: '音量减',
    icon: 'icon/logo.png',
    action: () => music.volumeDown()
  },
  {
    code: 'qq-lyric',
    title: 'Toggle Lyric',
    description: '开关桌面歌词',
    icon: 'icon/logo.png',
    action: () => music.toggleLyric()
  }
]

export const list: Array<NormalListTemplate> = [
  {
    code: 'qq-list',
    title: 'All Commands',
    description: '所有命令',
    searchList: none
  }
]
