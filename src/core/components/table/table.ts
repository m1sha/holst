import { IRect, Rect } from '../../rect'
import { Scene } from '../../scene'
import { Row } from './row'
import { TableDesigner } from './table-designer'
import { TableBehavior } from './table-behavior'
import { IPoint } from '../../point'

export class Table {
  private scene: Scene
  private behavior: TableBehavior | null = null
  containerRect: IRect
  rows: Row[] = []

  constructor (scene: Scene, containerSize: IRect) {
    this.scene = scene
    this.containerRect = containerSize
  }

  get drop () {
    return this.behavior!!.drop
  }

  set drop (a: (((s: string, P: IPoint, rect: Rect) => void) | null)) {
    this.behavior!!.drop = a
  }

  create () {
    const designer = new TableDesigner(this, this.scene)
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
