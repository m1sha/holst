import { Drawable } from './drawable'
import { Point, IPoint } from './point'

export class Anchor {
  container: Drawable | null = null
  dock: 'none' | 'top' | 'bottom' | 'left' | 'right' /* | 'fill' */ = 'none'
}

export function applyAnchor (drawable: Drawable): IPoint {
  let { x, y } = drawable.bounds
  if (drawable.anchor && drawable.anchor.container) {
    let dp = Point.zero as IPoint
    if (drawable.anchor.container.anchor && drawable.anchor.container.anchor.container) {
      dp = applyAnchor(drawable.anchor.container)
    }
    const r = drawable.anchor.container.bounds
    x = r.x + x + dp.x
    y = r.y + y + dp.y
  }
  return { x, y }
}
