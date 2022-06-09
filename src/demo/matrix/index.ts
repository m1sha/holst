import { Matrix2D } from '../../core/matrix'
import { Scene, Renderer2D, Color, Rect, Point } from 'index'
import { Size } from '../../core/size'
// import { Size } from '../../core/size'

export function createMatrixDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const size: Size = canvas
  const frame = new Rect(0, 0, size.width, size.height)
  scene.styleManager.defineShapeStyle('base', { lineWidth: 8, lineJoin: 'miter' })
  const blueRect = scene.styleManager.shapes('base').clone({ strokeStyle: Color.lightGrey })
  const redRect = scene.styleManager.shapes('base').clone({ strokeStyle: Color.darkGrey })
  const layer = scene.createLayer()
  const shape0 = layer.createShape(blueRect)

  const rect = new Rect(200, 200, 120, 80)
  layer.createShape({ fillStyle: Color.red }).circle(frame.absCenter, 3)
  shape0.rect(rect)
  const shapes = [
    layer.createShape(redRect).roundRect(rect, 12),
    layer.createShape(redRect).roundRect(rect, 12),
    layer.createShape(redRect).roundRect(rect, 12),
    layer.createShape(redRect).roundRect(rect, 12)
  ]

  const line = layer.createShape({ strokeStyle: Color.red }).moveTo(Point.zero).lineTo(Point.zero)
  // shape.rotate(Math.PI / 2)

  // domMatrix = domMatrix.rotateAxisAngle(140, 140, 0, Math.PI / 2)
  let i = 0
  let i2 = 0.1
  let scale = 1
  const renderer = new Renderer2D(canvas.getContext('2d', { colorSpace: 'display-p3' })!!)
  renderer.render(scene)
  renderer.onFrameChanged = () => {
    const count = shapes.length
    const d = 360 / count
    scale += i2
    for (let j = 0; j < count; j++) {
      const x = rect.x + rect.width / 2
      const y = rect.x + rect.height / 2
      const a = i + (d * j)
      const rotByCenterFrame = Matrix2D.identity.rotate(a, frame.absCenter)
      const newP = rotByCenterFrame.applyMatrix({ x, y })
      const rotByCenterSelf = Matrix2D.identity.scale({ x: scale, y: scale }, newP).rotate(a, newP)
      const m = rotByCenterSelf.mul(rotByCenterFrame)
      shapes[j].injectTransform(m)

      line.moveTos[0].x = frame.absCenter.x
      line.moveTos[0].y = frame.absCenter.y
      line.lineTos[0].x = newP.x
      line.lineTos[0].y = newP.y
    }
    i += 2

    if (i > 360) i = 0
    if (scale > 1.4) i2 = -0.02
    if (scale < 0.8) i2 = 0.02
  }
}
