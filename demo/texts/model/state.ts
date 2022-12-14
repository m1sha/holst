import { Drawable, Layer, Scene } from '../../../src'
import { ObjectStorage } from './storage'
import { Entity } from './entities/entity'

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

  get selectedObject (): Entity<Drawable> | undefined {
    return this.#storage.entities.find(p => p.selected)
  }

  set selectedObject (value: Entity<Drawable> | Readonly<Entity<Drawable>> | undefined) {
    if (value) {
      this.#storage.select(value)
    } else {
      this.#storage.unselect()
    }
    this.#storage.update()
  }

  get entities (): Readonly<Readonly<Entity<Drawable>>[]> {
    return this.#storage.entities
  }

  findEntity (id: string) {
    return this.#storage.entities.find(p => p.target.id === id)
  }

  update () {
    this.delegates.forEach(update => update())
  }

  addOnChange (delegate: () => void) {
    this.delegates.push(delegate)
  }

  addViewObject (viewObject: Entity<Drawable>) {
    this.#storage.addViewObject(viewObject)
    viewObject.create(this.selectedLayer!)
  }

  addViewObjects (viewObjects: Entity<Drawable>[]) {
    viewObjects.forEach(p => this.addViewObject(p))
  }
}
