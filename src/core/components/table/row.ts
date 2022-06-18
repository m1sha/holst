import { Cell } from './cell'

export class Row {
  cells: Cell[] = []
  height: number = 0
  createCell () {
    const cell = new Cell()
    this.cells.push(cell)
    return cell
  }
}
