import { gaussianBlur } from '../../core/raster/gaussian-blur'
import { Assets, Scene, Renderer2D } from 'index'
// import { G2dMath } from '../../core/g2dmath-lib'

export async function createBlurDemo (div: HTMLDivElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  const raster = assets.get('swamp')
  const imageData = raster.getData()

  // await G2dMath.load()
  console.time('gaussianBlur')

  // G2dMath.gaussianBlur(arrR1 as unknown as Uint32Array, arrR2 as unknown as Uint32Array, d.width, d.height, 4)
  // G2dMath.gaussianBlur(arrG1 as unknown as Uint32Array, arrG2 as unknown as Uint32Array, d.width, d.height, 4)
  // G2dMath.gaussianBlur(arrB1 as unknown as Uint32Array, arrB2 as unknown as Uint32Array, d.width, d.height, 4)
  const channelR = raster.channels.r.toArray()
  const channelG = raster.channels.g.toArray()
  const channelB = raster.channels.b.toArray()

  gaussianBlur(channelR, imageData.width, imageData.height, 4)
  gaussianBlur(channelG, imageData.width, imageData.height, 4)
  gaussianBlur(channelB, imageData.width, imageData.height, 4)

  console.timeEnd('gaussianBlur')

  let c = 0
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i + 0] = Math.min(255, Math.max(0, channelR[c]))
    imageData.data[i + 1] = Math.min(255, Math.max(0, channelG[c]))
    imageData.data[i + 2] = Math.min(255, Math.max(0, channelB[c]))
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
