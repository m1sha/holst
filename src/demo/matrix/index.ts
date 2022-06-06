import { Matrix2D } from '../../core/matrix'
import { Scene, Renderer2D, Color, Rect } from 'index'
// import { Size } from '../../core/size'

export function createMatrixDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  scene.styleManager.defineShapeStyle('base', { lineWidth: 8, lineJoin: 'miter' })
  const blueRect = scene.styleManager.shapes('base').clone({ strokeStyle: Color.blue })
  const redRect = scene.styleManager.shapes('base').clone({ strokeStyle: Color.red })
  const layer = scene.createLayer()
  const shape0 = layer.createShape(blueRect)
  const shape = layer.createShape(redRect)
  const rect = new Rect(200, 200, 180, 80)
  shape0.rect(rect)
  shape.rect(rect)
  // shape.rotate(Math.PI / 2)

  // domMatrix = domMatrix.rotateAxisAngle(140, 140, 0, Math.PI / 2)
  let i = 0
  let i2 = 0.1
  let scale = 2
  const renderer = new Renderer2D(canvas.getContext('2d', { colorSpace: 'display-p3' })!!)
  renderer.render(scene)
  renderer.onFrameChanged = () => {
    let domMatrix = new DOMMatrix()
    const x = rect.x + rect.width / 2
    const y = rect.x + rect.height / 2
    domMatrix = domMatrix.translate(x, y).rotate(i++).translate(-x, -y)

    scale += i2
    let domMatrix2 = new DOMMatrix()
    domMatrix2 = domMatrix.translate(x, y).scale(scale, scale).translate(-x, -y)

    const m = new Matrix2D(domMatrix.multiply(domMatrix2))
    shape.injectTransform(m)
    if (i > 360) i = 0
    if (scale > 2) i2 = -0.02
    if (scale < 0.3) i2 = 0.02
  }
}
