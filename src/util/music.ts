import {execAppleScript} from './exec-script'

function beforeExec(app: string, script: string) {
  return `
    tell application "${app}"
        if not application "${app}" is running then
            activate
            repeat until application "${app}" is running
            end repeat
            delay 0.5
        end if
        
        tell application "System Events"
            tell process "${app}"
                ${script}
            end tell
        end tell
    end tell`
}

function commonScript(script: string) {
  return beforeExec(
    'QQMusic',
    `
    tell menu "播放控制" of menu bar item "播放控制" of menu bar 1
        ${script}
    end tell`
  )
}

export function playPause() {
  execAppleScript(commonScript(`click menu item 1`))
}

export function prev() {
  execAppleScript(commonScript(`click menu item "上一首"`))
}

export function next() {
  execAppleScript(commonScript(`click menu item "下一首"`))
}

export function like() {
  execAppleScript(commonScript(`click menu item "喜欢歌曲"`))
}

export function toggleLyric() {
  execAppleScript(commonScript(`click menu item 8`))
}

export function volumeUp() {
  execAppleScript(commonScript(`click menu item "音量加"`))
}

export function volumeDown() {
  execAppleScript(commonScript(`click menu item "音量减"`))
}