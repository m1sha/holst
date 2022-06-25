import { Rect } from '../../rect'
import { IPoint } from '../../point'
import { TableControl } from './table-control'

export type CellDropEventCallBack = (data: unknown, point: IPoint, rect: Rect) => void
export type CellDragoverEventCallBack = (control: TableControl, point: IPoint) => void
export type CellDragleaveEventCallBack = (control: TableControl, point: IPoint) => void

export class TableBehavior {
  private controls: TableControl[]
  onDrop: CellDropEventCallBack | null = null
  onDragover: CellDragoverEventCallBack | null = null
  onDragleave: CellDragleaveEventCallBack | null = null
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
        .on('dragover', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onDragover) this.onDragover(control, point)
        })
        .on('dragleave', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onDragleave) this.onDragleave(control, point)
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
        if (this.onDrop) this.onDrop(data, point, shape.bounds)
      })
    }
  }
}
