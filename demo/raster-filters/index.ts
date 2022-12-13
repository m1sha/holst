import { Scene, Renderer2D, Assets, Brightness, Rect, Size } from '../../src/index'
// import { GreyScale } from '../../src/core/raster/filters/greyscale'
import { Randomize } from '../../src/core/raster/filters/randomize'
// import { BoxBlur } from '../../src/core/raster/filters/box-blur'
import { GaussianBlur } from '../../src/core/raster/filters/gaussian-blur'
// import { Pattern } from '../../src/core/pattern'

const size: Size = { width: 800, height: 600 }

export async function createDemo (appDiv: HTMLDivElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/monkey.png')
  await assets.busy
  const raster = assets.get('swamp')
  const origin = raster.clone()

  console.time('Brightness')
  raster
    .filters
    .add(new Randomize(1000, true))
    // .add(new GreyScale())
    .add(new Brightness(50))
    .add(new GaussianBlur(14))
    .apply()
  console.timeEnd('Brightness')

  const scene = new Scene()
  const scene2 = new Scene()

  raster.distRect = new Rect({ x: 0, y: 0 }, size)
  origin.distRect = new Rect({ x: 0, y: 0 }, size)
  scene.createLayer().add(raster)
  scene2.createLayer().add(origin)

  // scene.createLayer().createShape({ fill: new Pattern(raster) }).rect(10, 10, 400, 400)
  createScene(appDiv, scene, scene2)
}

function createScene (appDiv: HTMLDivElement, scene: Scene, scene2: Scene) {
  const div = document.createElement('div')
  div.className = 'canvas-wrapper'

  const canvas = document.createElement('canvas')
  canvas.height = 600
  canvas.width = 800
  div.append(canvas)

  const canvas2 = document.createElement('canvas')
  canvas2.height = 600
  canvas2.width = 800
  div.append(canvas2)

  const renderer = new Renderer2D(canvas.getContext('2d')!)
  renderer.render(scene)
  const renderer2 = new Renderer2D(canvas2.getContext('2d')!)
  renderer2.render(scene2)

  appDiv.append(div)
}
