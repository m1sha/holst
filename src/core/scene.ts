import { Matrix2D } from './matrix'
import { Arrange } from './arrange'
import { Layer } from './layers'
import { StyleManager } from './styles/style-manager'
import { TaskManager } from './tasks/task-manager'
import { Animation, AnimationOptions } from './animations/animation'
import { removeItem } from '../utils/array'
import { EventType } from './events/interactive'
import { SceneEventHandler } from './events/event-handler2'

export class Scene {
    private _layers: Layer []
    private taskManager: TaskManager
    private arrange: Arrange
    private globalTransform: Matrix2D
    readonly actionLayer: Layer
    readonly styleManager: StyleManager

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

    on<EventTypeKey extends keyof EventType> (type: EventTypeKey, listener: (ev: EventType[EventTypeKey]) => void): this {
      this.eventHandler.add(type, listener)
      return this
    }

    off<EventTypeKey extends keyof EventType> (type: EventTypeKey): this {
      this.eventHandler.remove(type)
      return this
    }

    /** @internal */ eventHandler: SceneEventHandler = new SceneEventHandler()

    /* @internal */ invokeAnimation (t: number) { this.taskManager.invoke(t) }

    /** @internal */ onRemoveLayer: ((layer: Layer) => void) | null = null
}
