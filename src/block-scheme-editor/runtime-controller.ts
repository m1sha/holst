import { EventInfo } from '../core/event-handler'
import { Point } from '../core/point'
import { Scene } from '../core/scene'
import { rect } from '../core/utils'
import { Editor } from './editor'
import { cursor } from './utils/cursor'

export class Runtime {
  private editor: Editor

  private lastClickPos: Point
  constructor (editor: Editor) {
    this.editor = editor
  }

  start (scene: Scene) {
    scene.addEventListener('mousemove', e => this.mousemove(e))
    scene.addEventListener('click', e => this.click(e))
    scene.addEventListener('mousedown', e => this.mousedown(e))
    scene.addEventListener('mouseup', e => this.mouseup(e))
  }

  private click (e: EventInfo) {
    const point = e.point
    if (!point) return
    const { controller, storage } = this.editor
    const block = storage.findHoverBlock(point)
    if (!block) return
    if (block.selected) controller.unselectBlock(block)
    else controller.selectBlock(block)
    storage.applyChanges()
  }

  private mousemove (e: EventInfo) {
    const point = e.point
    const { storage } = this.editor
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
    storage.applyChanges()
  }

  private mousedown (e: EventInfo) {
    this.lastClickPos = e.point
    const { storage } = this.editor
    storage.selectRegion = rect(e.point.x, e.point.y, 5, 5)
    storage.applyChanges()
  }

  private mouseup (e: EventInfo) {
    const { storage } = this.editor
    this.lastClickPos = null
    storage.selectRegion = null
    storage.applyChanges()
  }
}
