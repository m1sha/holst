import { Layer } from '../../layers'

export class TableBehavior {
  private layer: Layer
  draggable?: { isDragover: boolean }
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
          shape.style.fillStyle = '#819911'
        })
        .on('dragleave', () => {
          shape.style.fillStyle = style.fillStyle
        })
        .on('hover', e => {
          if (this.draggable && this.draggable.isDragover) {
            shape.style.fillStyle = '#819911'
          }
        })
        .on('leave', e => {
          shape.style.fillStyle = style.fillStyle
        })
        .on('mousemove', e => {
          console.log(e)
        })
    }
  }
}
