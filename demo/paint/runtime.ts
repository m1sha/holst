// import { EventInfo } from '../../src/'
import { EventHandler } from '../../src/index'
import { Editor } from './editor'

export class Runtime {
  private eventHandler: EventHandler
  private editor: Editor
  constructor (editor: Editor) {
    this.eventHandler = editor.eventHandler
    this.editor = editor
    this.start()
  }

  start () {
    // this.eventHandler.addEventListener('mousemove', e => this.mousemove(e))
    // this.eventHandler.addEventListener('click', e => this.onClick(e))
    // this.eventHandler.addEventListener('mousedown', e => this.mousedown(e))
    // this.eventHandler.addEventListener('mouseup', e => this.mouseup(e))
  }

  private onClick (e: Event) {
    // if (!e.point) return
    // const point = e.point
    // const { mapSizeX, mapSizeY, size } = this.editor
    // const row = Math.floor(point.y / (size.height / mapSizeY))
    // const col = Math.floor(point.x / (size.width / mapSizeX))
    // this.editor.setMap(row, col)
  }
}
