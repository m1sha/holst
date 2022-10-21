import { Drawable } from './drawable'
import { Point, IPoint } from './geometry/point'

export class Anchor {
  #container: Drawable | null = null
  #modifyMap: Map<string, boolean> = new Map()
  #drawables: Drawable[] = []

  get container (): Drawable | null {
    return this.#container
  }

  set container (value: Drawable | null) {
    this.#container = value
    if (value) {
      value.onModified = () => {
        for (const key of this.#modifyMap.keys()) {
          this.#modifyMap.set(key, true)

          const item = this.#drawables.find(p => p.id === key) // TODO need refactoring here! (drawables.find(...))
          if (item && item.onModified) item.onModified()
        }
      }
    }
  }

  addChild (value: Drawable) {
    if (!value) throw new Error('value is not defined.')
    this.#modifyMap.set(value.id, true)
    this.#drawables.push(value)
  }

  isModified (value: Drawable) {
    return this.#modifyMap.get(value.id)
  }

  setUnmodified (value: Drawable) {
    this.#modifyMap.set(value.id, false)
  }

  static create (container: Drawable) {
    const anchor = new Anchor()
    anchor.container = container
    return anchor
  }
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

export function getAnchorPoint (anchor: Anchor): IPoint {
  if (!anchor.container) return Point.zero
  const p = new Point(anchor.container.bounds)
  //  // while (true) {
  //   if (!anchor.container.anchor || !anchor.container.anchor.container) return p
  //   const p2 = anchor.container.anchor.container.bounds
  //   p = p.add(p2)
  // // }
  return p
}
