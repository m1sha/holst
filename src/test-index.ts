import { Scene } from './core/scene'
import { padding, point, rect } from './core/utils'

export function testScene (canvas: HTMLCanvasElement) {
  const scene = new Scene(canvas)
  const layer0 = scene.createLayer()
  const frame = layer0.createShape()
  frame.style.strokeStyle = '#222'
  frame.rect(rect(0, 0, layer0.size.width - 1, layer0.size.height - 1))
  const layer = scene.createLayer('bottom-left')

  layer.setPadding(padding(0, 100, 0, 0))
  const rect1 = layer.createShape()
  rect1.style.strokeStyle = '#555'
  rect1.rect(rect(0, 0, 100, 100))
  rect1.rect(rect(0, 0, layer.size.width - 4, layer.size.height))

//   layer.location.x = 130
//   layer.location.y = 130
//   const shape = layer.createShape()
//   shape.style.strokeStyle = '#555'
//   shape.lineV(point(1, 1), 480)
//   shape.lineV(point(719, 1), 480)
//   shape.lineH(point(2, 1), 720)
//   shape.lineH(point(1, 479), 720)
  scene.render()
}
