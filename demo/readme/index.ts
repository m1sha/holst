import { Anchor } from '../../src/core/anchor'
import { Scene, Renderer2D, Color, CubicBezier, SvgPathD, Shape, Rect, Point } from '../../src/index'

export function createReadmeDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer = scene.createLayer()

  const svgPathD = new SvgPathD('M3.20895 9.21552L1.38504 9.91815C0.980514 10.074 0.582889 9.67636 0.738723 9.27183L1.44135 7.44792C1.46646 7.38272 1.50497 7.32351 1.55437 7.2741L7.32845 1.50002C7.52372 1.30476 7.8403 1.30476 8.03556 1.50002L9.15685 2.62131C9.35211 2.81657 9.35211 3.13315 9.15685 3.32842L3.38277 9.1025C3.33336 9.1519 3.27415 9.19041 3.20895 9.21552Z')
  const path2d = svgPathD.toPath2D()
  const pen = Shape.create({ stroke: '#0d22d2', fill: '#441116' }, path2d)
  pen.move({ x: 130, y: 130 })
  pen.scale({ x: 4, y: 4 })

  const shape = layer.createShape({ fill: Color.blue }).circle({ x: 150, y: 150 }, 50)
  shape.name = 'circle'
  layer.addShape(pen)

  const animation = scene.createAnimation({ duration: 1500 })
  const movement = CubicBezier.easeInOut
  animation.action = ({ t }) => (
    shape.style.fill = Color.fromGradient(movement.calc(t).x, [Color.blue, Color.red, Color.green])
  )
  animation.finish = () => (shape.style.fill = Color.blue)

  shape.on('click', e => {
    animation.start()
    cont.rects[0].y += 10
    e.event.stopPropagation()
  })

  const cont = layer.createShape({ fill: '#444' }).rect(new Rect(0, 0, 100, 100))
  cont.name = 'cont-1'

  const anchor = Anchor.create(cont)

  const shpGrey = layer.createShape({ fill: '#bbb' }).rect(new Rect(10, 10, 20, 20))
  shpGrey.name = 'shpGrey'
  shpGrey.setAnchor(anchor)

  const text0 = layer.createTextBlock('Text', { color: '#AAA' }, new Point(10, 40))
  text0.name = 'Text AAA'
  text0.setAnchor(anchor)

  const cont2 = layer.createShape({ fill: '#112bbb' }).rect(new Rect(40, 10, 20, 20))
  cont2.name = 'cont-2'
  cont2.setAnchor(anchor)

  const anchor2 = Anchor.create(cont2)

  const shp = layer.createShape({ fill: '#fff' }).rect(new Rect(5, 5, 10, 10))
  shp.name = 'child-cont2'
  shp.setAnchor(anchor2)

  const anchor3 = Anchor.create(shp)
  layer.createShape({ fill: '#ff0000' }).circle({ x: 5, y: 5 }, 5).setAnchor(anchor3)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
