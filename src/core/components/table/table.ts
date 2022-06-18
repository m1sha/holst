import { IRect } from '../../rect'
import { Scene } from '../../scene'
import { Row } from './row'
import { TableDesigner } from './table-designer'
import { TableBehavior } from './table-behavior'

export class Table {
  private scene: Scene
  containerRect: IRect
  rows: Row[] = []
  draggable?: { isDragover: boolean }

  constructor (scene: Scene, containerSize: IRect) {
    this.scene = scene
    this.containerRect = containerSize
  }

  create () {
    const designer = new TableDesigner(this, this.scene)
    const { layer } = designer.create()

    const behavior = new TableBehavior(layer, this.draggable)
    behavior.create()
  }

  addRow (): Row {
    const row = new Row()
    this.rows.push(row)
    return row
  }
}
