import { Scene } from '../core/scene'
import { CommandController } from './command-controller'
import { ElementStorage } from './elements/element-storage'

import { Runtime } from './runtime-controller'
export class Editor {
  private scene: Scene
  storage: ElementStorage
  controller: CommandController

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas)
    this.storage = new ElementStorage(this.scene)
    this.controller = new CommandController(this)
    const runtime = new Runtime(this)
    runtime.start(this.scene)
  }
}
