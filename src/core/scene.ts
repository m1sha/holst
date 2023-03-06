import { Arrange } from './arrange'
import { Layer } from './layers'
import { StyleManager } from './styles/style-manager'
import { TaskManager } from './tasks/task-manager'
import { Animation, AnimationOptions } from './animations/animation'
import { removeItem } from '../utils/array'
import { SceneEventHandler } from './events/event-handler2'
import { Size } from './geometry/size'

export class Scene {
    #size: Size
    private _layers: Layer []
    private taskManager: TaskManager
    private arrange: Arrange
    protected eventHandler: SceneEventHandler = new SceneEventHandler()
    protected invokeAnimation (t: number) { this.taskManager.invoke(t) }
    protected onRemoveLayer: ((layer: Layer) => void) | null = null
    readonly actionLayer: Layer
    readonly styleManager: StyleManager

    constructor () {
      this.#size = { width: 0, height: 0 }
      this._layers = []
      this.arrange = new Arrange(this._layers)
      this.styleManager = new StyleManager()
      this.taskManager = new TaskManager()
      this.actionLayer = new Layer(0, this.styleManager)
    }

    createLayer (name?: string, frozen?: boolean): Layer {
      const result = new Layer(this.arrange.order, this.styleManager, name)
      this._layers.push(result)
      if (frozen) result.frozen = true
      return result
    }

    removeLayer (index: number): void
    // eslint-disable-next-line no-dupe-class-members
    removeLayer (name: string): void
    // eslint-disable-next-line no-dupe-class-members
    removeLayer (...args: Array<any>): void {
      if (args.length !== 1) throw new Error('unsupported number of parameters.')
      const value = args[0]
      if (typeof value === 'number') {
        if (this.onRemoveLayer) this.onRemoveLayer(this._layers[value])
        removeItem(this._layers, value)
      }
      if (typeof value === 'string') {
        const index = this._layers.findIndex(p => p.name === value)
        if (index < 0) throw new Error(`The layer ${value} isn't found.`)
        if (this.onRemoveLayer) this.onRemoveLayer(this._layers[index])
        removeItem(this._layers, index)
      }
    }

    clearAllLayers () {
      this.#size = { width: 0, height: 0 }
      this.clearActiveLayer()
      for (const layer of [...this._layers]) layer.clear()
      this._layers = []
    }

    clearActiveLayer () {
      this.actionLayer.clear()
    }

    clearAllAnimations () {
      this.taskManager.clearAll()
    }

    createAnimation (options?: AnimationOptions) {
      return new Animation(this.taskManager, options)
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

    get size (): Readonly<Size> {
      if (!this._layers.length) return this.#size
      const size: Size = { width: 0, height: 0 }
      for (const layer of this._layers) {
        if (!layer.modified) continue
        const { width, height } = layer.size
        if (width > size.width) size.width = width
        if (height > size.height) size.height = height
      }
      if (size.width > this.#size.width) this.#size.width = size.width
      if (size.height > this.#size.height) this.#size.height = size.height
      return this.#size
    }
}
