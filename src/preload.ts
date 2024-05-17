import {
  Action,
  ImmutableListItem,
  ListItem,
  ListRenderFunction,
  MutableListTemplate,
  NoneTemplate,
  hideAndOutPlugin,
  templateBuilder
} from 'utools-utils'
import * as music from './music'

const currentCode: { value: string } = { value: '' }

function preEnter(action: Action) {
  currentCode.value = action.code
  hideAndOutPlugin()
}

const none: Array<NoneTemplate> = [
  {
    code: 'qq-play-pause',
    enter: (action) => {
      preEnter(action)
      music.playPause()
    }
  },
  {
    code: 'qq-prev',
    enter: (action) => {
      preEnter(action)
      music.prev()
    }
  },
  {
    code: 'qq-next',
    enter: (action) => {
      preEnter(action)
      music.next()
    }
  },
  {
    code: 'qq-like',
    enter: (action) => {
      preEnter(action)
      music.like()
    }
  },
  {
    code: 'qq-dislike',
    enter: (action) => {
      preEnter(action)
      music.dislike()
    }
  },
  {
    code: 'qq-up',
    enter: (action) => {
      preEnter(action)
      music.volumeUp()
    }
  },
  {
    code: 'qq-down',
    enter: (action) => {
      preEnter(action)
      music.volumeDown()
    }
  },
  {
    code: 'qq-shuffle',
    enter: (action) => {
      preEnter(action)
      music.toggleShuffle()
    }
  },
  {
    code: 'qq-lyric',
    enter: (action) => {
      preEnter(action)
      music.toggleLyric()
    }
  },
  {
    code: 'qq-quit',
    enter: (action) => {
      preEnter(action)
      music.quit()
    }
  }
]

class MusicSearch implements MutableListTemplate {
  code = 'qq-search'
  placeholder = '输入歌曲名'
  searchWord = ''

  enter(action: Action, render: ListRenderFunction) {
    currentCode.value = action.code
    this.searchWord = ''
  }

  search(action: Action, searchWord: string, render: ListRenderFunction): void {
    this.searchWord = searchWord
  }

  select(action: Action, item: ListItem) {}
}

class MusicCommandList implements MutableListTemplate {
  code = 'qq-list'
  $list: ImmutableListItem[]

  constructor() {
    this.$list = [
      {
        title: '播放或暂停',
        description: 'Play Pause',
        icon: 'logo.png',
        handler: async () => music.playPause()
      },
      {
        title: '上一首',
        description: 'Previous Track',
        icon: 'logo.png',
        handler: async () => music.prev()
      },
      {
        title: '下一首',
        description: 'Next Track',
        icon: 'logo.png',
        handler: async () => music.next()
      },
      {
        title: '喜欢歌曲',
        description: 'Like Track',
        icon: 'logo.png',
        handler: async () => music.like()
      },
      {
        title: '取消喜欢',
        description: 'Dislike Track',
        icon: 'logo.png',
        handler: async () => music.like()
      },
      {
        title: '音量加',
        description: 'Volume Up',
        icon: 'logo.png',
        handler: async () => music.volumeUp()
      },
      {
        title: '音量减',
        description: 'Volume Down',
        icon: 'logo.png',
        handler: async () => music.volumeDown()
      },
      {
        title: '开关随机播放',
        description: 'Toggle Shuffle',
        icon: 'logo.png',
        handler: async () => music.toggleShuffle()
      },
      {
        title: '开关桌面歌词',
        description: 'Toggle Lyric',
        icon: 'logo.png',
        handler: async () => music.toggleLyric()
      },
      {
        title: '退出QQ音乐',
        description: 'Quit QQMusic',
        icon: 'logo.png',
        handler: async () => music.quit()
      }
    ]
  }

  enter(action: Action, render: ListRenderFunction) {
    currentCode.value = action.code
    render(this.$list)
  }

  async select(action: Action, item: ImmutableListItem) {
    hideAndOutPlugin()
    await item.handler(action)
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return
  if (currentCode.value === Search.code) {
    music.searchMusic(Search.searchWord)
    hideAndOutPlugin()
  }
})

const Search = new MusicSearch()
window.exports = templateBuilder()
  .none(...none)
  .mutableList(new MusicCommandList())
  .mutableList(Search)
  .build()
