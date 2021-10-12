import { EventInfo } from '../core/event-handler'
import { CommandController } from './command-controller'
import { Environment } from './environment'
import { cursor } from './utils/cursor'

export class RuntimeController {
  private environment: Environment
  private commandController: CommandController
  constructor (environment: Environment, commandController: CommandController) {
    this.environment = environment
    this.commandController = commandController
  }

  start () {
    const scene = this.environment.scene
    scene.addEventListener('mousemove', e => this.mousemove(e))
    scene.addEventListener('click', e => this.click(e))
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
    this.environment.update()
  }
}
