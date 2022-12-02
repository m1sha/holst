import { Drawable, Layer, TextBlock, Shape, Color } from '../../../src'

export class ViewObject {
  object: Drawable
  frame: Shape | null
  selected: boolean = false

  constructor (drawable: Drawable) {
    this.object = drawable
    this.frame = null
  }

  create (layer: Layer) {
    const drawable = this.object as TextBlock
    layer.add(drawable)
    const bounds = drawable.bounds
    this.frame = Shape.create({ stroke: Color.orange }).rect(bounds)
    this.frame.hidden = !this.selected
    layer.add(this.frame)
  }

  update () {
    if (!this.frame) return
    this.frame.hidden = !this.selected
  }
}
