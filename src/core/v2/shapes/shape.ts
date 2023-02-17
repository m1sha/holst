import { ShapeStyle, ShapeStyleImpl } from '../../styles/shape-style'
import { Rect } from '../../geometry/rect'

export abstract class Shape {
  /** @internal */ protected onChangeProperty: (() => void) | null = null
  protected propertyChanged () { if (this.onChangeProperty) this.onChangeProperty() }
  readonly style: ShapeStyleImpl

  constructor (style?: ShapeStyle) {
    this.style = new ShapeStyleImpl(style ?? {}, () => {
      this.propertyChanged()
    })
  }

  abstract get bounds (): Rect
}
