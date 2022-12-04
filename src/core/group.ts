import { removeItem } from '../utils/array'
import { Drawable, DrawableType } from './drawable'
import { Point } from './geometry/point'
import { Rect } from './geometry/rect'

export class Group extends Drawable {
  #items: Drawable[] = []

  add (item: Drawable): this {
    this.#items.push(item)
    return this
  }

  remove (item: Drawable): this {
    removeItem(this.#items, p => p.id === item.id)
    return this
  }

  get items (): Readonly<Drawable[]> {
    return this.#items
  }

  getType (): DrawableType {
    return 'group'
  }

  get bounds (): Rect {
    if (!this.items) return new Rect(0, 0, 0, 0)
    const rect = this.items[0].bounds
    for (let i = 1; i < this.items.length; i++) rect.join(this.items[i].bounds)

    return rect
  }

  inPath (p: Point): boolean {
    const rect = this.bounds
    if (this.anchor && this.anchor.container) {
      rect.x += this.anchor.container.bounds.x
      rect.y += this.anchor.container.bounds.y
    }
    return rect.intersectsPoint(p)
  }
}
