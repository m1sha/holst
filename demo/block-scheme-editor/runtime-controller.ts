import { EventHandler, EventInfo } from '../../src/core/event-handler'
import { Point } from '../../src/core/point'
import { Rect } from '../../src/core/rect'
import { Editor } from './editor'
import { cursor } from './utils/cursor'

export class Runtime {
  private editor: Editor
  private eventHandler: EventHandler

  private lastClickPos: Point | null = null
  constructor (editor: Editor) {
    this.editor = editor
    this.eventHandler = editor.evenHandler
  }

  start () {
    this.eventHandler.addEventListener('mousemove', e => this.mousemove(e))
    this.eventHandler.addEventListener('click', e => this.click(e))
    this.eventHandler.addEventListener('mousedown', e => this.mousedown(e))
    this.eventHandler.addEventListener('mouseup', e => this.mouseup(e))
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
      if (!e.point || !start) return
      storage.selectRegion = new Rect(start.x, start.y, e.point.x, e.point.y)
    }
    storage.applyChanges()
  }

  private mousedown (e: EventInfo) {
    if (!e.point) return
    this.lastClickPos = e.point
    const { storage } = this.editor
    storage.selectRegion = new Rect(e.point.x, e.point.y, 5, 5)
    storage.applyChanges()
  }

  private mouseup (e: EventInfo) {
    const { storage } = this.editor
    this.lastClickPos = null
    storage.selectRegion = null
    storage.applyChanges()
  }
}
