import { Shadow } from '../../src/core/styles/shadow'
import { Assets, Scene, Renderer2D, Rect, Point, Anchor, IPoint, Color, Drawable, Shape } from '../../src/index'

export async function createDemo (appDiv: HTMLDivElement) {
  const assets = await loadAssets()
  const raster = assets.get('swamp')

  const scene = new Scene()
  const layer = scene.createLayer()

  const redCircle = Shape.create({ fill: Color.red }).circle(300, 100, 50)
  redCircle.name = 'Red Circle'

  const blueCircle = Shape.create({ fill: Color.darkBlue }).circle(300, 300, 70)
  blueCircle.name = 'Blue Circle'

  const greenRect = Shape.create({ fill: '#115511' }).rect(10, 10, 100, 100)
  greenRect.name = 'Green Rect'
  const anchor = Anchor.create(greenRect)

  layer.add(redCircle)
  layer.add(blueCircle)
  layer.add(greenRect)

  layer.add(raster)

  raster.setAnchor(anchor)
  raster.distRect = new Rect(10, 40, 150, 150)

  setEvents(redCircle)
  setEvents(blueCircle)
  setEvents(greenRect)

  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 700
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
  appDiv.append(canvas)
}

function setEvents (drawable: Drawable) {
  let delta = Point.zero
  drawable
    .on('hover', e => {
      e.event.stopPropagation()
      if (drawable instanceof Shape) {
        drawable.style.shadow = new Shadow({ x: 10, y: 4 }, 8, '#aaa')
      }
    })
    .on('leave', e => {
      e.event.stopPropagation()
      if (drawable instanceof Shape) drawable.style.shadow = undefined
    })
    .on('mousedown', e => {
      e.event.stopPropagation()
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
      if (drawable instanceof Shape) delta = new Point(drawable.figures.last() as IPoint).dec(p)
    })
    .on('mouseup', e => {
      e.cursor = 'default'
    })
    .on('mousemove', e => {
      if (!e.event.hit) return
      e.event.stopPropagation()
      console.log('mousemove on ' + drawable.name)
      if (!e.event.pressed) {
        return
      }

      e.cursor = 'move'
      const p = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }

      if (drawable instanceof Shape) {
        const rect = drawable.figures.last() as IPoint
        rect.x = delta.x + p.x
        rect.y = delta.y + p.y
      }
    })
    .on('dblclick', e => {
      console.log('name ' + drawable.name + ' order ' + drawable.order)
      e.event.stopPropagation()
    })
}

async function loadAssets () {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  return assets
}
