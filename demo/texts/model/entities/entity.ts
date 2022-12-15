import { Drawable, Layer, Shape, Rect } from '../../../../src'
import { EntityReadonly } from './entity-readonly'

export class Entity<T extends Drawable> {
  private boundsFrame: Shape | null = null
  private selectFrame: Shape | null = null
  readonly target: T
  selected: boolean = false
  showBounds: boolean = false
  layer: Layer | null = null

  constructor (target: T) {
    this.target = target
  }

  create (layer: Layer) {
    layer.add(this.target as any)
    this.layer = layer
    this.boundsFrame = Shape.create(layer.styleManager.shapes('bounds-frame')).rect(this.target.bounds)
    this.selectFrame = Shape.create(layer.styleManager.shapes('select-frame')).rect(this.target.bounds.outline(-8))
    this.boundsFrame.hidden = !this.showBounds
    this.selectFrame.hidden = !this.selected
    layer.add(this.boundsFrame)
    layer.add(this.selectFrame)
  }

  update () {
    if (this.boundsFrame) {
      this.boundsFrame.hidden = !this.showBounds
      Rect.assign(this.boundsFrame.rects[0], this.target.bounds)
    }

    if (this.selectFrame) {
      this.selectFrame.hidden = !this.selected
      Rect.assign(this.selectFrame.rects[0], this.target.bounds.outline(-8))
    }
  }

  equals (entity: EntityReadonly<T>) {
    return this.target.id === entity.target.id
  }
}
