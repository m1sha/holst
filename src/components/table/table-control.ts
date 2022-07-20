import { Drawable } from '../../core/drawable'
import Shape from '../../core/shape'
import { Cell } from './cell'
import { Row } from './row'

export interface TableControl {
  cellShape: Shape
  row: Row
  cell: Cell
  rowIndex: number
  columnIndex: number
  content: Drawable[]
}
