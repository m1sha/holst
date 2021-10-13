import { EventInfo } from '../core/event-handler'
import { Point } from '../core/point'
import { rect } from '../core/utils'
import { CommandController } from './command-controller'
import { Environment } from './environment'
import { cursor } from './utils/cursor'

export class RuntimeController {
  private environment: Environment
  private commandController: CommandController
  private lastClickPos: Point
  constructor (environment: Environment, commandController: CommandController) {
    this.environment = environment
    this.commandController = commandController
  }

  start () {
    const scene = this.environment.scene
    scene.addEventListener('mousemove', e => this.mousemove(e))
    scene.addEventListener('click', e => this.click(e))
    scene.addEventListener('mousedown', e => this.mousedown(e))
    scene.addEventListener('mouseup', e => this.mouseup(e))
  }

  private click (e: EventInfo) {
    const point = e.point
    if (!point) return
    const block = this.environment.findHoverBlock(point)
    if (!block) return
    if (block.selected) this.commandController.unselectBlock(block)
    else this.commandController.selectBlock(block)
    this.environment.update()
  }

  private mousemove (e: EventInfo) {
    const point = e.point
    if (!point) return
    this.environment.clearHover()
    const block = this.environment.findHoverBlock(point)
    if (block) {
      block.hovered = true
      cursor('pointer')
    } else {
      cursor('default')
    }

    if (this.environment.selectRegion) {
      const start = this.lastClickPos
      this.environment.selectRegion = rect(start.x, start.y, e.point.x, e.point.y)
    }
    this.environment.update()
  }

  private mousedown (e: EventInfo) {
    this.lastClickPos = e.point
    this.environment.selectRegion = rect(e.point.x, e.point.y, 5, 5)
    this.environment.update()
  }

  private mouseup (e: EventInfo) {
    this.environment.selectRegion = null
    this.lastClickPos = null
    this.environment.update()
  }
}
