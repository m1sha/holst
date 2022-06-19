import { IPoint } from '../../point'
import { Layer } from '../../layers'

export class TableBehavior {
  private layer: Layer
  draggable?: { isDragover: boolean }
  drop: ((s: string, p: IPoint) => void) | null = null
  constructor (layer: Layer, draggable?: { isDragover: boolean }) {
    this.layer = layer
    this.draggable = draggable
  }

  create () {
    const shapes = this.layer.shapes
    for (const shape of shapes) {
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
          if (this.drop) this.drop(s, p)
        })
    }
  }
}
