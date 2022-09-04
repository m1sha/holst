import { Assets, Scene, Renderer2D, Rect, Point, Anchor, IPoint, Color } from '../../src/index'

export async function createContainersDemo (canvas: HTMLCanvasElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  const raster = assets.get('swamp')

  const scene = new Scene()

  const layer = scene.createLayer()

  layer.createShape({ fill: Color.red }).circle(300, 100, 50)

  const shape = layer.createShape({ fill: '#115511' }).rect(10, 10, 100, 100)
  const anchor = Anchor.create(shape)
  layer.createShape({ fill: '#fff' }).rect(10, 10, 20, 20).setAnchor(anchor)

  layer.addRaster(raster)
  raster.setAnchor(anchor)
  raster.distRect = new Rect(10, 40, 150, 150)
  raster.order = 5

  let delta = Point.zero
  shape
    .on('hover', () => shape.shadow.set({ x: 10, y: 4 }, 8, '#aaa'))
    .on('leave', () => shape.shadow.clear())
    .on('mousedown', e => {
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

      e.cursor = 'move'
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
      const rect = shape.figures.first() as IPoint
      rect.x = delta.x + p.x
      rect.y = delta.y + p.y
    })

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
