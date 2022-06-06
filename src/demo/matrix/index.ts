import { Matrix2D } from '../../core/matrix'
import { Scene, Renderer2D, Color, Rect } from 'index'
// import { Size } from '../../core/size'

export function createMatrixDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()
  const shape0 = layer.createShape({ strokeStyle: Color.blue })
  const shape = layer.createShape({ strokeStyle: Color.black })
  shape0.rect(new Rect(100, 100, 80, 80))
  shape.rect(new Rect(100, 100, 80, 80))
  // shape.rotate(Math.PI / 2)

  // domMatrix = domMatrix.rotateAxisAngle(140, 140, 0, Math.PI / 2)
  let i = 0
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
  renderer.onFrameChanged = () => {
    let domMatrix = new DOMMatrix()
    domMatrix = domMatrix.translate(140, 140).multiply(domMatrix.rotate(i++)).translate(-140, -140)
    const m = new Matrix2D(domMatrix)
    shape.injectTransform(m)
    if (i > 360) i = 0
  }
}
