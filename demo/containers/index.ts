import { Assets, Scene, Renderer2D, Rect, Point, Anchor, IPoint, Color } from '../../src/index'

export async function createContainersDemo (canvas: HTMLCanvasElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  const raster = assets.get('swamp')

  const scene = new Scene()

  const layer = scene.createLayer()

  const circle = layer.createShape({ fill: Color.red }).circle(300, 100, 50)

  const shape = layer.createShape({ fill: '#115511' }).rect(10, 10, 100, 100)
  const anchor = Anchor.create(shape)
  const whiteRect = layer.createShape({ fill: '#fff' }).rect(10, 10, 20, 20)
  // whiteRect.order = 2
  whiteRect.setAnchor(anchor)
  whiteRect.hidden = true

  layer.addRaster(raster)
  raster.setAnchor(anchor)
  raster.distRect = new Rect(10, 40, 150, 150)
  // raster.order = 5

  let delta = Point.zero
  shape
    .on('hover', e => {
      e.event.stopPropagation()
      shape.shadow.set({ x: 10, y: 4 }, 8, '#aaa')
    })
    .on('leave', () => shape.shadow.clear())
    .on('mousedown', e => {
      e.event.stopPropagation()
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
      delta = new Point(shape.figures.first() as IPoint).dec(p)
    })
    .on('mouseup', e => {
      e.cursor = 'default'
    })
    .on('mousemove', e => {
      if (!e.event.pressed) {
        return
      }
      e.event.stopPropagation()

      e.cursor = 'move'
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
      const rect = shape.figures.first() as IPoint
      rect.x = delta.x + p.x
      rect.y = delta.y + p.y
    })
    .on('dblclick', e => {
      console.log('main shape shape order is ' + shape.order)
    })

  let delta2 = Point.zero
  circle
    .on('hover', e => {
      e.event.stopPropagation()
      circle.shadow.set({ x: 10, y: 4 }, 8, '#aaa')
    })
    .on('leave', () => circle.shadow.clear())
    .on('mousedown', e => {
      e.event.stopPropagation()
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
      delta2 = new Point(circle.figures.last() as IPoint).dec(p)
    })
    .on('mouseup', e => {
      e.cursor = 'default'
    })
    .on('mousemove', e => {
      if (!e.event.pressed) {
        return
      }
      e.event.stopPropagation()

      e.cursor = 'move'
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
      const rect = circle.figures.last() as IPoint
      rect.x = delta2.x + p.x
      rect.y = delta2.y + p.y

      // console.log(circle.toString())
    })
    .on('dblclick', e => {
      console.log('circle order is ' + circle.order)
    })

  whiteRect.on('dblclick', e => {
    e.event.stopPropagation()
    console.log('whiteRect order is ' + whiteRect.order)
  })

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
