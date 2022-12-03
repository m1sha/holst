import { Drawable, Layer, TextBlock, Shape, Color } from '../../../src'

export class ViewObject {
  readonly object: Drawable
  private boundsFrame: Shape | null
  private selectFrame: Shape | null
  selected: boolean = false
  showBounds: boolean = false

  constructor (drawable: Drawable) {
    this.object = drawable
    this.boundsFrame = null
    this.selectFrame = null
  }

  create (layer: Layer) {
    const drawable = this.object as TextBlock
    layer.add(drawable)
    const bounds = drawable.bounds
    this.boundsFrame = Shape.create({ stroke: Color.orange }).rect(bounds)
    this.boundsFrame.hidden = !this.showBounds
    layer.add(this.boundsFrame)
  }

  update (layer: Layer) {
    if (!this.boundsFrame) return
    this.boundsFrame.hidden = !this.showBounds
    if (this.selected) {
      const bounds = this.object.bounds
      this.selectFrame = Shape.create({ stroke: Color.blue, lineDash: [5, 3] }).rect(bounds.outline(-8))
      layer.add(this.selectFrame)
    }
  }
}
