import { Cell } from './cell'

export class Row {
  cells: Cell[] = []
  createCell () {
    const cell = new Cell()
    this.cells.push(cell)
    return cell
  }
}
