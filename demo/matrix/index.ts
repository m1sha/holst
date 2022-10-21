import { Scene, Renderer2D, Color, Rect, Point, Size, ShapeStyle, Matrix2D, TextBlock } from '../../src/index'
// import { Size } from '../../core/size'
// import { ShapeStyle } from '../../core/shape-style'

export function createMatrixDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const size: Size = canvas
  const frame = new Rect(0, 0, size.width, size.height)

  scene.styleManager.defineShapeStyle('base', { lineWidth: 8, lineJoin: 'miter' })
  const style = (s: ShapeStyle) => scene.styleManager.shapes('base').clone(s)
  const layer = scene.createLayer()
  const shape0 = layer.createShape(style({ stroke: Color.lightGrey }))

  const rect = new Rect(200, 200, 120, 80)
  shape0.rect(rect)

  const shapes = [
    layer.createShape(style({ stroke: Color.blue })).roundRect(rect, 12),
    layer.createShape(style({ stroke: Color.red })).roundRect(rect, 12),
    layer.createShape(style({ stroke: Color.green })).roundRect(rect, 12),
    layer.createShape(style({ stroke: Color.darkGrey })).roundRect(rect, 12)
  ]
  const lines = [
    layer.createShape({ stroke: Color.lightGrey }).moveTo(Point.zero).lineTo(Point.zero),
    layer.createShape({ stroke: Color.lightGrey }).moveTo(Point.zero).lineTo(Point.zero),
    layer.createShape({ stroke: Color.lightGrey }).moveTo(Point.zero).lineTo(Point.zero),
    layer.createShape({ stroke: Color.lightGrey }).moveTo(Point.zero).lineTo(Point.zero)
  ]

  layer.createShape({ fill: Color.red }).circle(frame.absCenter, 3)

  let angle = 0
  let dScale = 0.1
  let scale = 1
  const renderer = new Renderer2D(canvas.getContext('2d', { colorSpace: 'display-p3' })!!)
  renderer.setAnimationRate(1000 / 240)
  renderer.render(scene)
  const fps = TextBlock.create('FPS: ' + renderer.getAnimationFps().toString(), { })
  fps.target = new Point(10, 20)
  layer.addTextBlock(fps)
  renderer.onFrameChanged = () => {
    const count = shapes.length
    const d = 360 / count
    scale += dScale
    for (let j = 0; j < count; j++) {
      const x = rect.x + rect.width / 2
      const y = rect.x + rect.height / 2
      const a = angle + (d * j)
      const rotByCenterFrame = Matrix2D.identity.rotate(a, frame.absCenter)
      const newP = rotByCenterFrame.applyMatrix({ x, y })
      const rotByCenterSelf = Matrix2D.identity.scale({ x: scale, y: scale }, newP).rotate(a, newP)
      const m = rotByCenterSelf.mul(rotByCenterFrame)
      shapes[j].injectTransform(m)

      lines[j].moveTos[0].x = frame.absCenter.x
      lines[j].moveTos[0].y = frame.absCenter.y
      lines[j].lineTos[0].x = newP.x
      lines[j].lineTos[0].y = newP.y
    }
    angle += 2

    if (angle > 360) angle = 0
    if (scale > 1.4) dScale = -0.02
    if (scale < 0.8) dScale = 0.02
  }

  setInterval(() => {
    fps.text = 'FPS: ' + renderer.getAnimationFps().toFixed(0).toString()
  }, 1000)
}
