import { Renderer2D } from '../core/renderer2D'
import { EventHandler } from '../core/event-handler'
import { Scene } from '../core/scene'
import { CommandController } from './command-controller'
import { ElementStorage } from './elements/element-storage'
import { Runtime } from './runtime-controller'
export class Editor {
  private scene: Scene
  private renderer: Renderer2D
  storage: ElementStorage
  controller: CommandController
  evenHandler: EventHandler

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas)
    this.renderer = new Renderer2D(canvas.getContext('2d'))
    this.evenHandler = new EventHandler(this.scene, this.renderer)
    this.storage = new ElementStorage(this.scene, this.renderer)
    this.controller = new CommandController(this)
    const runtime = new Runtime(this)
    runtime.start()
  }
}
