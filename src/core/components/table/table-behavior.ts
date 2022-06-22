import { Rect } from '../../rect'
import { IPoint } from '../../point'
import { TableControl } from './table-control'

export class TableBehavior {
  private controls: TableControl[]
  drop: ((s: string, p: IPoint, rect: Rect) => void) | null = null
  constructor (controls: TableControl[], draggable?: { isDragover: boolean }) {
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
          // if (this.draggable && this.draggable.isDragover) {

          // }
          shape.style.fillStyle = '#819911'
        })
        .on('leave', e => {
          shape.style.fillStyle = style.fillStyle
        })
        .on('mousemove', e => {
          // console.log(e)
        })
        .on('drop', e => {
          console.log(e)
          const s = e.event.origin.dataTransfer!!.getData('text/plain')
          const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.drop) this.drop(s, p, shape.bounds)
        })
    }
  }
}
