import { Rect } from '../../rect'
import { IPoint } from '../../point'
import { TableControl } from './table-control'

export type CellDropEventCallBack = (data: unknown, point: IPoint, rect: Rect) => void
export type CellDragoverEventCallBack = (control: TableControl, point: IPoint) => void
export type CellDragleaveEventCallBack = (control: TableControl, point: IPoint) => void
export type CellMouseEventCallBack = (control: TableControl, point: IPoint) => void

export class TableBehavior {
  private controls: TableControl[]
  onDrop: CellDropEventCallBack | null = null
  onDragover: CellDragoverEventCallBack | null = null
  onDragleave: CellDragleaveEventCallBack | null = null
  onCellHover: CellMouseEventCallBack | null = null
  onCellLeave: CellMouseEventCallBack | null = null
  constructor (controls: TableControl[]) {
    this.controls = controls
  }

  create () {
    const controls = this.controls
    for (const control of controls) {
      if (control.columnIndex === 0) continue
      const shape = control.cellShape
      // const style = shape.copyStyle()
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
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onCellHover) this.onCellHover(control, point)
        })
        .on('leave', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onCellLeave) this.onCellLeave(control, point)
        })
        .on('mousemove', e => {
          // console.log(e)
        })

      shape.on('drop', e => {
        const data = JSON.parse(e.event.origin.dataTransfer!!.getData('text/plain'))
        const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
        if (this.onDrop) this.onDrop(data, point, shape.bounds)
      })
    }
  }
}
