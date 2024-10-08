import { nativeTheme } from 'electron'
import is from 'electron-is'
import path from 'path'
import { ViteDevPort } from '../../../configs/vite.port'
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions
const index = path.resolve(__dirname, '../render/index.html')
const tray = path.resolve(__dirname, '../render/tray.html')

interface PageOptions {
  [key: string]: {
    attrs: BrowserWindowConstructorOptions
    bindCloseToHide: boolean
    url: string
  }
}

const options: PageOptions = {
  index: {
    attrs: {
      title: 'PhpWebStudy',
      width: 1100,
      height: 780,
      minWidth: 800,
      minHeight: 600,
      trafficLightPosition: { x: 3, y: 6 },
      backgroundColor: nativeTheme.shouldUseDarkColors ? '#000' : '#fff',
      // backgroundColor: '#262D3D',
      transparent: !is.windows()
    },
    bindCloseToHide: true,
    url: is.dev() ? `http://localhost:${ViteDevPort}` : `file://${index}`
  },
  tray: {
    attrs: {},
    bindCloseToHide: true,
    url: is.dev() ? `http://localhost:${ViteDevPort}/tray.html` : `file://${tray}`
  }
}

export default options
