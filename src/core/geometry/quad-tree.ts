import { ConstraintGrid } from '../constraint-grid'
import { IPoint } from './point'
import { QuadTreeBranch, QuadTreeBranchData } from './quad-tree-branch'
import { Rect } from './rect'

export class QuadTree <T extends QuadTreeBranchData> {
  private level: number
  private readonly nw: QuadTreeBranch<T>
  private readonly ne: QuadTreeBranch<T>
  private readonly sw: QuadTreeBranch<T>
  private readonly se: QuadTreeBranch<T>
  maxCount = 100
  maxDepth = 5

  constructor (bounds: Rect, level: number = 1) {
    const grid = new ConstraintGrid(bounds, 2, 2)
    this.nw = new QuadTreeBranch(grid.getCell(0, 0).rect)
    this.ne = new QuadTreeBranch(grid.getCell(0, 1).rect)
    this.sw = new QuadTreeBranch(grid.getCell(1, 0).rect)
    this.se = new QuadTreeBranch(grid.getCell(1, 1).rect)
    this.level = level
  }

  getElementsByPoint (point: IPoint): T[] {
    let branch = this.nw.bounds.intersectsPoint(point) ? this.nw : null

    if (!branch) branch = this.ne.bounds.intersectsPoint(point) ? this.ne : null
    if (!branch) branch = this.sw.bounds.intersectsPoint(point) ? this.sw : null
    if (!branch) branch = this.se.bounds.intersectsPoint(point) ? this.se : null
    if (!branch) return []

    if (branch.count <= this.maxCount) return branch.inPoint(point)

    return branch.tree ? branch.tree.getElementsByPoint(point) : branch.inPoint(point)
  }

  addElement (element: T) {
    if (this.nw.bounds.intersectsRect(element.bounds)) this.nw.addItem(element, this.maxCount, this.maxDepth, this.level)
    if (this.ne.bounds.intersectsRect(element.bounds)) this.ne.addItem(element, this.maxCount, this.maxDepth, this.level)
    if (this.sw.bounds.intersectsRect(element.bounds)) this.sw.addItem(element, this.maxCount, this.maxDepth, this.level)
    if (this.se.bounds.intersectsRect(element.bounds)) this.se.addItem(element, this.maxCount, this.maxDepth, this.level)
  }

  removeElement (element: T) {
    if (this.nw.bounds.intersectsRect(element.bounds)) this.nw.removeItem(element)
    if (this.ne.bounds.intersectsRect(element.bounds)) this.ne.removeItem(element)
    if (this.sw.bounds.intersectsRect(element.bounds)) this.sw.removeItem(element)
    if (this.se.bounds.intersectsRect(element.bounds)) this.se.removeItem(element)
  }

  get count () {
    return this.nw.count + this.ne.count + this.sw.count + this.se.count
  }
}
