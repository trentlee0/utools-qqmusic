import {exec} from 'child_process'


export function execCommand(command: string, ignore?: boolean, msg?: string) {
  exec(command, (err) => {
    if (!err) return
    if (ignore) {
      console.error(`错误: ${err}`)
    } else {
      utools.showNotification(msg ? msg : `错误: ${err}`)
    }
  })
}

export function execAppleScript(script: string) {
  execCommand(`osascript -e '${script}'`, true)
  utools.outPlugin()
  utools.hideMainWindow()
}
