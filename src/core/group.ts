import { removeItem } from '../utils/array'
import { Drawable, DrawableType } from './drawable'
import { Point } from './geometry/point'
import { Rect } from './geometry/rect'
import { Matrix2D } from './matrix'

export class Group extends Drawable {
  #items: Drawable[] = []
  name: string

  constructor (order: number, name?: string, items?: Drawable[]) {
    super(order)
    this.name = name ?? 'unnamed group'
    if (items) this.#items.push(...items)
  }

  add (item: Drawable): this {
    if (!item) throw new Error('an undefined value is not supported')
    item.injectTransform(this.transform)
    this.#items.push(item)
    return this
  }

  remove (item: Drawable): this {
    if (!item) throw new Error('an undefined value is not supported')
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

  get originalBounds (): Rect {
    throw new Error('Method not implemented.')
  }

  inPath (p: Point): boolean {
    const rect = this.bounds
    if (this.anchor && this.anchor.container) {
      rect.x += this.anchor.container.bounds.x
      rect.y += this.anchor.container.bounds.y
    }
    return rect.intersectsPoint(p)
  }

  clone (): Group {
    const result = new Group(this.order, this.name, this.#items.map(p => p.clone()))
    result.transform = this.transform.copy()
    return result
  }

  injectTransform (transform: Matrix2D) {
    this.transform = transform
    this.items.forEach(p => p.injectTransform(this.transform))
  }

  static create (name?: string, items?: Drawable[]) {
    return new Group(0, name, items)
  }
}
