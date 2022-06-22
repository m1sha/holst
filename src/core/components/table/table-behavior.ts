import { Rect } from '../../rect'
import { IPoint } from '../../point'
import { TableControl } from './table-control'

export type CellDropEventCallBack = (data: unknown, point: IPoint, rect: Rect) => void

export class TableBehavior {
  private controls: TableControl[]
  drop: CellDropEventCallBack | null = null
  constructor (controls: TableControl[]) {
    this.controls = controls
  }

  create () {
    const controls = this.controls
    for (const control of controls) {
      if (control.columnIndex === 0 || control.rowIndex === 0) continue
      const shape = control.cellShape
      const style = shape.copyStyle()
      shape
        .on('dragover', () => {
          shape.style.fillStyle = '#219911'
        })
        .on('dragleave', () => {
          shape.style.fillStyle = style.fillStyle
        })
        .on('hover', e => {
          shape.style.fillStyle = '#819911'
        })
        .on('leave', e => {
          shape.style.fillStyle = style.fillStyle
        })
        .on('mousemove', e => {
          // console.log(e)
        })

      shape.on('drop', e => {
        const data = e.event.origin.dataTransfer!!.getData('text/plain')
        const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
        if (this.drop) this.drop(data, point, shape.bounds)
      })
    }
  }
}
