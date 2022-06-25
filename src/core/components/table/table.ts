import { IRect } from '../../rect'
import { Scene } from '../../scene'
import { Row } from './row'
import { CellDrawCallback, TableDesigner } from './table-designer'
import { TableBehavior, CellDropEventCallBack } from './table-behavior'
import { IComponent } from '../component'

export class Table implements IComponent {
  private behavior: TableBehavior | null = null
  containerRect: IRect
  rows: Row[] = []
  onCellDraw: CellDrawCallback | null = null
  onDrop: CellDropEventCallBack | null = null

  constructor (containerSize: IRect) {
    this.containerRect = containerSize
  }

  create (scene: Scene) {
    const designer = new TableDesigner(this, scene)
    if (this.onCellDraw) designer.onCellDraw = this.onCellDraw
    const { controls } = designer.create()!!

    this.behavior = new TableBehavior(controls)
    this.behavior.onDrop = this.onDrop
    this.behavior.create()
  }

  addRow (): Row {
    const row = new Row()
    this.rows.push(row)
    return row
  }
}
