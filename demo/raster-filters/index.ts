import { Scene, Renderer2D, Assets, Brightness, Rect } from '../../src/index'
// import { GreyScale } from '../../src/core/raster/filters/greyscale'
import { Randomize } from '../../src/core/raster/filters/randomize'
// import { Pattern } from '../../src/core/pattern'

export async function createRasterDemo (canvas: HTMLCanvasElement, canvas2: HTMLCanvasElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/city.png')
  await assets.busy
  const raster = assets.get('swamp')
  const origin = raster.clone()

  console.time('Brightness')
  raster
    .useFilters
    .add(new Randomize(160, true))
    // .add(new GreyScale())
    .add(new Brightness(0))
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
