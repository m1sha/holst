import { IRect } from '../../rect'
import { Scene } from '../../scene'
import { Row } from './row'
import { CellDrawCallback, TableDesigner } from './table-designer'
import { TableBehavior, CellDropEventCallBack } from './table-behavior'

export class Table {
  private scene: Scene
  private behavior: TableBehavior | null = null
  containerRect: IRect
  rows: Row[] = []
  onCellDraw: CellDrawCallback | null = null

  constructor (scene: Scene, containerSize: IRect) {
    this.scene = scene
    this.containerRect = containerSize
  }

  get drop () {
    return this.behavior!!.drop
  }

  set drop (a: CellDropEventCallBack | null) {
    this.behavior!!.drop = a
  }

  create () {
    const designer = new TableDesigner(this, this.scene)
    if (this.onCellDraw) designer.onCellDraw = this.onCellDraw
    const { controls } = designer.create()!!

    this.behavior = new TableBehavior(controls)
    this.behavior.create()
  }

  addRow (): Row {
    const row = new Row()
    this.rows.push(row)
    return row
  }
}
