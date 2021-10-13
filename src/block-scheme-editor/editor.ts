import { Scene } from '../core/scene'
import { CommandController } from './command-controller'
import { ElementFactory } from './elements/element-factory'
import { ElementStorage } from './elements/element-storage'

import { RuntimeController } from './runtime-controller'
export class Editor {
  scene: Scene
  storage: ElementStorage
  controller: CommandController

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas)
    this.storage = new ElementStorage(this.scene)
    this.controller = new CommandController(this)
    const runtimeController = new RuntimeController(this, this.controller)
    runtimeController.start()
  }

  update () {
    this.storage.render()
  }

  get factory () {
    return ElementFactory
  }
}
