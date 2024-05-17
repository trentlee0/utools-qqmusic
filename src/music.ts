import { execAppleScript } from 'utools-utils/preload'

function ensureAppActivated(app: string, script: string) {
  return `
    tell application "System Events"
      if (name of processes) does not contain "${app}" then
        tell application "${app}" to activate
        repeat until processes where name is not (exists "${app}")
        end repeat
        delay 0.5
      end if
    end

    ${script}`
}

async function runControl(script: string) {
  const commonScript = `
    tell application "System Events"
      tell process "QQMusic"
        tell menu "播放控制" of menu bar item "播放控制" of menu bar 1
          ${script}
        end tell
      end tell
    end tell`
  await execAppleScript(ensureAppActivated('QQMusic', commonScript))
}

async function clickControl(menuItem: string | number) {
  const item = typeof menuItem === 'number' ? menuItem : `"${menuItem}"`
  await runControl(`click menu item ${item}`)
}

export async function playPause() {
  await clickControl(1)
}

export async function prev() {
  await clickControl('上一首')
}

export async function next() {
  await clickControl('下一首')
}

export async function like() {
  await clickControl('喜欢歌曲')
}

export async function dislike() {
  await clickControl('取消喜欢')
}

export async function toggleLyric() {
  await clickControl(8)
}

export async function volumeUp() {
  await clickControl('音量加')
}

export async function volumeDown() {
  await clickControl('音量减')
}

export async function toggleShuffle() {
  const script = `
    tell menu "播放模式" of menu item "播放模式"
      set isShuffled to value of attribute "AXMenuItemMarkChar" of menu item "随机播放"
      if isShuffled is equal to "✓" then
        click menu item "顺序播放"
      else
        click menu item "随机播放"
      end if
    end tell`
  await runControl(script)
}

export async function searchMusic(keyword: string) {
  const script = `
    tell application "QQMusic" to activate
    tell application "System Events"
      tell process "QQMusic"
        tell menu "编辑" of menu bar item "编辑" of menu bar 1
          set backup to the clipboard
          click menu item "搜索"
          set the clipboard to "${keyword}"
          key code 9 using {command down}
          key code 76
          set the clipboard to backup
        end tell
      end tell
    end tell`
  await execAppleScript(ensureAppActivated('QQMusic', script))
}

export async function quit() {
  await execAppleScript('tell application "QQMusic" to quit')
}
