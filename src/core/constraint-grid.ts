import { Size } from './size'
import { Rect, IRect } from './rect'
import { Point, IPoint } from './point'

export type ConstraintGridCell = { rect: Rect, center: Point }
export class ConstraintGrid {
  readonly size: Readonly<Size>
  readonly rows: number
  readonly columns: number
  readonly startPoint: IPoint = Point.zero
  cells: ConstraintGridCell[]
  constructor (size: Size | IRect, rows: number, columns: number) {
    this.size = size
    this.rows = rows
    this.columns = columns
    this.cells = []
    const point = size as IPoint
    if (point && typeof point.x !== 'undefined' && typeof point.y !== 'undefined') {
      this.startPoint = point
    }

    this.calculate()
  }

  getCell (row: number, columns: number) {
    const index = (row * this.columns) + columns
    return this.cells[index]
  }

  private calculate () {
    const { width, height } = this.size
    const { columns, rows } = this
    const cellWidth = width / columns
    const cellHeight = height / rows
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const x = cellWidth * j + this.startPoint.x
        const y = cellHeight * i + this.startPoint.y
        this.cells.push({
          rect: new Rect(x, y, cellWidth, cellHeight),
          center: new Point(cellWidth / 2 + x, cellHeight / 2 + y)
        })
      }
    }
  }
}
