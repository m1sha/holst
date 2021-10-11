import { Scene } from '../core/scene'
import { rect } from '../core/utils'

export function createSchemaPicker (canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const s = new Scene(canvas)
  s.createLayer().createShape({ fillStyle: '#F11333' }).rect(rect(0, 0, canvas.width, canvas.height))
  s.createLayer().createImage({ src: img, sx: 10, sy: 80, sWidth: canvas.width, sHeight: canvas.height, dx: 10, dy: 2 })
  s.render()
}
