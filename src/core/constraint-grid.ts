import { Size } from './size'
import { Rect, IRect } from './rect'
import { Point, IPoint } from './point'

export type ConstraintGridCell = { rect: Rect, center: Point }
export type ColumnConstraint = { column: number, width: number }
export type RowConstraint = { row: number, height: number }
export type Constraints = { rows: RowConstraint[], columns: ColumnConstraint[] }
export class ConstraintGrid {
  readonly size: Readonly<Size>
  readonly rows: number
  readonly columns: number
  readonly startPoint: IPoint
  cells: ConstraintGridCell[]
  readonly constraints: Constraints
  constructor (size: Size | IRect, rows: number, columns: number, constraints?: Constraints) {
    this.size = size
    this.rows = rows
    this.columns = columns
    this.cells = []
    this.startPoint = Point.is(size) ? size as IPoint : Point.zero
    this.constraints = constraints ?? { rows: [], columns: [] }
    this.calcIfConstraints()
  }

  getCell (row: number, columns: number) {
    const index = (row * this.columns) + columns
    return this.cells[index]
  }

  // private calculate () {
  //   const { width, height } = this.size
  //   const { columns, rows } = this
  //   const cellWidth = width / columns
  //   const cellHeight = height / rows

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < columns; j++) {
  //       const x = cellWidth * j + this.startPoint.x
  //       const y = cellHeight * i + this.startPoint.y
  //       this.cells.push({
  //         rect: new Rect(x, y, cellWidth, cellHeight),
  //         center: new Point(cellWidth / 2 + x, cellHeight / 2 + y)
  //       })
  //     }
  //   }
  // }

  private calcIfConstraints () {
    const { columns, rows } = this

    const heights = this.getRowHeights()
    const widths = this.getColumnWidth()
    let currHeight = 0
    for (let i = 0; i < rows; i++) {
      let currWidth = 0
      const height = heights[i]
      for (let j = 0; j < columns; j++) {
        const width = widths[j]
        const y = currHeight + this.startPoint.y
        const x = currWidth + this.startPoint.x
        this.cells.push({
          rect: new Rect(x, y, width, height),
          center: new Point(width / 2 + x, height / 2 + y)
        })
        currWidth += width
      }
      currHeight += height
    }
  }

  private getRowHeights () {
    const usedSpace = this.constraints.rows.reduce((dd, d) => dd + d.height, 0)
    const autoHeight = (this.size.height - usedSpace) / (this.rows - this.constraints.rows.length)
    const result = []
    for (let i = 0; i < this.rows; i++) {
      const r = this.constraints.rows.filter(p => p.row === i)[0]
      result.push(r ? r.height : autoHeight)
    }
    return result
  }

  private getColumnWidth () {
    const usedSpace = this.constraints.columns.reduce((dd, d) => dd + d.width, 0)
    const autoWidth = (this.size.width - usedSpace) / (this.columns - this.constraints.columns.length)
    const result = []
    for (let i = 0; i < this.columns; i++) {
      const r = this.constraints.columns.filter(p => p.column === i)[0]
      result.push(r ? r.width : autoWidth)
    }
    return result
  }
}
