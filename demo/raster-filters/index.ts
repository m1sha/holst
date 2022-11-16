import { Scene, Renderer2D, Assets, Brightness, Rect } from '../../src/index'
// import { GreyScale } from '../../src/core/raster/filters/greyscale'
import { Randomize } from '../../src/core/raster/filters/randomize'
// import { BoxBlur } from '../../src/core/raster/filters/box-blur'
import { GaussianBlur } from '../../src/core/raster/filters/gaussian-blur'
// import { Pattern } from '../../src/core/pattern'

export async function createRasterDemo (canvas: HTMLCanvasElement, canvas2: HTMLCanvasElement) {
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

  raster.distRect = new Rect({ x: 0, y: 0 }, canvas)
  origin.distRect = new Rect({ x: 0, y: 0 }, canvas2)
  scene.createLayer().add(raster)
  scene2.createLayer().add(origin)

  // scene.createLayer().createShape({ fill: new Pattern(raster) }).rect(10, 10, 400, 400)

  const renderer = new Renderer2D(canvas.getContext('2d')!)
  renderer.render(scene)
  const renderer2 = new Renderer2D(canvas2.getContext('2d')!)
  renderer2.render(scene2)
}
