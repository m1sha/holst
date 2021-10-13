import { EventInfo } from '../core/event-handler'
import { Point } from '../core/point'
import { rect } from '../core/utils'
import { CommandController } from './command-controller'
import { Editor } from './editor'
import { cursor } from './utils/cursor'

export class RuntimeController {
  private editor: Editor
  private commandController: CommandController
  private lastClickPos: Point
  constructor (editor: Editor, commandController: CommandController) {
    this.editor = editor
    this.commandController = commandController
  }

  start () {
    const scene = this.editor.scene
    scene.addEventListener('mousemove', e => this.mousemove(e))
    scene.addEventListener('click', e => this.click(e))
    scene.addEventListener('mousedown', e => this.mousedown(e))
    scene.addEventListener('mouseup', e => this.mouseup(e))
  }

  private click (e: EventInfo) {
    const point = e.point
    if (!point) return
    const block = this.editor.storage.findHoverBlock(point)
    if (!block) return
    if (block.selected) this.commandController.unselectBlock(block)
    else this.commandController.selectBlock(block)
    this.editor.update()
  }

  private mousemove (e: EventInfo) {
    const point = e.point
    const storage = this.editor.storage
    if (!point) return
    storage.clearHover()
    const block = storage.findHoverBlock(point)
    if (block) {
      block.hovered = true
      cursor('pointer')
    } else {
      cursor('default')
    }

    if (storage.selectRegion) {
      const start = this.lastClickPos
      storage.selectRegion = rect(start.x, start.y, e.point.x, e.point.y)
    }
    this.editor.update()
  }

  private mousedown (e: EventInfo) {
    this.lastClickPos = e.point
    this.editor.storage.selectRegion = rect(e.point.x, e.point.y, 5, 5)
    this.editor.update()
  }

  private mouseup (e: EventInfo) {
    this.editor.storage.selectRegion = null
    this.lastClickPos = null
    this.editor.update()
  }
}
