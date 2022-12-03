import { Layer, Scene } from '../../../src'
import { ObjectStorage } from '../model/storage'
import { ViewObject } from '../model/view-object'

export class State {
  private delegates: (() => void)[] = []
  private selectedLayer: Layer | null = null
  private techLayer: Layer | null = null
  #scene: Scene | null = null
  #storage: ObjectStorage = new ObjectStorage()

  constructor () {
    this.selectedLayer = this.scene.createLayer()
    this.techLayer = this.scene.createLayer()
  }

  get scene () {
    if (!this.#scene) this.#scene = new Scene()
    return this.#scene
  }

  get selectedObject (): ViewObject | undefined {
    return this.#storage.viewObjects.find(p => p.selected)
  }

  set selectedObject (value: ViewObject | undefined) {
    if (value) {
      this.#storage.select(value)
    } else {
      this.#storage.unselect()
    }
    this.#storage.update(this.techLayer!)
  }

  get viewObjects (): Readonly<Readonly<ViewObject>[]> {
    return this.#storage.viewObjects
  }

  findViewObject (id: string) {
    return this.#storage.viewObjects.find(p => p.object.id === id)
  }

  update () {
    this.delegates.forEach(update => update())
  }

  addOnChange (delegate: () => void) {
    this.delegates.push(delegate)
  }

  addViewObject (viewObject: ViewObject) {
    this.#storage.addViewObject(viewObject)
    viewObject.create(this.selectedLayer!)
  }

  addViewObjects (viewObjects: ViewObject[]) {
    viewObjects.forEach(p => this.addViewObject(p))
  }
}
