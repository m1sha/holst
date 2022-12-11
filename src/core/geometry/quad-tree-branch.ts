import { removeItem } from '../../utils/array'
import { IPoint } from './point'
import { QuadTree } from './quad-tree'
import { Rect } from './rect'

export type QuadTreeBranchData = {
  id: string
  bounds: Rect
  isInPath(point: IPoint): boolean
}

export class QuadTreeBranch<T extends QuadTreeBranchData> {
  #tree: QuadTree<T> | null = null
  readonly bounds: Rect
  private readonly items: T[] = []

  constructor (bounds: Rect) {
    this.bounds = bounds
  }

  addItem (item: T, maxCount: number, maxDepth: number, level: number) {
    this.items.push(item)

    if (level > maxDepth) return
    if (this.items.length < maxCount) return

    if (this.#tree) {
      this.#tree.addElement(item)
      return
    }

    this.#tree = new QuadTree(this.bounds, level + 1)
    this.#tree.maxCount = maxCount
    this.#tree.maxDepth = maxDepth
    this.items.forEach(p => this.#tree?.addElement(p))
  }

  removeItem (item: T) {
    if (this.#tree) {
      this.#tree.removeElement(item)
      if (this.#tree.count === 0) this.#tree = null
    }
    removeItem(this.items, p => p.id === item.id)
  }

  inPoint (point: IPoint) {
    return this.items.filter(p => p.isInPath(point))
  }

  get tree (): QuadTree<T> | null {
    return this.#tree
  }

  get count () {
    return this.items.length
  }
}
