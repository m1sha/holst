import { gaussianBlur } from '../../src/core/raster/gaussian-blur'
import { Assets, Scene, Renderer2D } from '../../src/index'

export async function createBlurDemo (div: HTMLDivElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  const raster = assets.get('swamp')
  const imageData = raster.getData()

  console.time('toArray')
  const channelR = raster.channels.r
  const channelG = raster.channels.g
  const channelB = raster.channels.b
  console.timeEnd('toArray')

  console.time('vanilla gaussianBlur')
  gaussianBlur(channelR, imageData.width, imageData.height, 4)
  gaussianBlur(channelG, imageData.width, imageData.height, 4)
  gaussianBlur(channelB, imageData.width, imageData.height, 4)
  console.timeEnd('vanilla gaussianBlur')

  let c = 0
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i + 0] = channelR[c]
    imageData.data[i + 1] = channelG[c]
    imageData.data[i + 2] = channelB[c]
    c++
  }

  raster.setData(imageData)

  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 1000
  div.appendChild(canvas)

  const scene = new Scene()
  const layer = scene.createLayer()
  layer.createImage(raster)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
