import { Matrix2D } from './matrix'
import { Arrange } from './arrange'
import { Layer } from './layers'
import { StyleManager } from './style-manager'
import { TaskManager } from './tasks/task-manager'

export class Scene {
    private _layers: Layer []
    readonly actionLayer: Layer
    readonly styleManager: StyleManager
    readonly taskManager: TaskManager
    private arrange: Arrange
    private globalTransform: Matrix2D

    constructor () {
      this._layers = []
      this.arrange = new Arrange(this._layers)
      this.styleManager = new StyleManager()
      this.taskManager = new TaskManager()
      this.actionLayer = new Layer(0, this.styleManager)
      this.globalTransform = Matrix2D.identity
    }

    createLayer (name?: string, frozen?: boolean): Layer {
      const result = new Layer(this.arrange.order, this.styleManager, name)
      result.globalTransform = this.globalTransform
      this._layers.push(result)
      if (frozen) result.frozen = true
      return result
    }

    clearAllLayers () {
      this.clearActiveLayer()
      for (const layer of [...this._layers]) layer.clear()
      this._layers = []
    }

    clearActiveLayer () {
      this.actionLayer.clear()
    }

    sendToBack (layer: Layer) {
      this.arrange.sendToBack(layer)
    }

    sendToBackward (layer: Layer) {
      this.arrange.sendToBackward(layer)
    }

    bringToFront (layer: Layer) {
      this.arrange.bringToFront(layer)
    }

    bringToForward (layer: Layer) {
      this.arrange.bringToForward(layer)
    }

    get layers (): Readonly<Layer>[] {
      return this._layers
    }
}
