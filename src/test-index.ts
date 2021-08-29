import { Coords } from './core/coords'
import { Scene } from './core/scene'
import { point, rect } from './core/utils'

export function testScene (canvas: HTMLCanvasElement) {
  const scene = new Scene(canvas)
  const layer0 = scene.createLayer()
  const frame = layer0.createShape()
  frame.style.strokeStyle = '#222'
  frame.rect(rect(0, 0, layer0.size.width - 1, layer0.size.height - 1))

  const sp = point(10, 10)

  const layer1 = scene.createLayer()
  const p0 = Coords.getScreenOrientation(sp, scene.size, 'top-left')
  const sh0 = layer1.createShape()
  sh0.style.strokeStyle = '#333'
  sh0.rect(rect(p0.x, p0.y, 20, 20))

  const layer2 = scene.createLayer('bottom-left')
  const p1 = Coords.getScreenOrientation(sp, scene.size, 'bottom-left')
  const sh1 = layer2.createShape()
  sh1.style.strokeStyle = '#333'
  sh1.rect(rect(p1.x, p1.y, 20, 20))

  const layer3 = scene.createLayer('top-right')
  const p2 = Coords.getScreenOrientation(sp, scene.size, 'top-right')
  const sh2 = layer3.createShape()
  sh2.style.strokeStyle = '#333'
  sh2.rect(rect(p2.x, p2.y, 20, 20))

  const layer4 = scene.createLayer('bottom-right')
  const p3 = Coords.getScreenOrientation(sp, scene.size, 'bottom-right')
  const sh3 = layer4.createShape()
  sh3.style.strokeStyle = '#333'
  sh3.rect(rect(p3.x, p3.y, 20, 20))

  const layerN = scene.createLayer()
  const shN = layerN.createShape()
  shN.style.strokeStyle = '#040809'
  shN.style.lineWidth = 1
  shN.style.lineJoin = 'round'
  shN.line(point(20, 20), point(100, 100), { arrow: { endTip: { length: 8, dir: 1 } } })
  shN.line(point(80, 120), point(300, 112), { arrow: { endTip: {} } })
  shN.line(point(300, 300), point(80, 60), { arrow: { startTip: {}, endTip: {} } })

  scene.render()
}
