import { gaussianBlur } from '../../src/core/raster/gaussian-blur'
import { Assets, Scene, Renderer2D } from '../../src/index'
import { G2dMath } from '../../src/core/g2dmath-lib'

export async function createBlurDemo (div: HTMLDivElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  const raster = assets.get('swamp')
  const imageData = raster.getData()

  await G2dMath.load()

  // console.time('vanilla toUint8ClampedArray')
  // const channelRx = raster.channels.r.channel // .toArray()
  // const channelGx = raster.channels.g.channel // .toArray()
  // const channelBx = raster.channels.b.channel // .toArray()
  // console.timeEnd('vanilla toUint8ClampedArray')

  console.time('wasm extractCannel')
  const c1 = G2dMath.extractCannel(imageData.data, 0)
  const c2 = G2dMath.extractCannel(imageData.data, 1)
  const c3 = G2dMath.extractCannel(imageData.data, 2)
  console.timeEnd('wasm extractCannel')

  // console.time('wasm gaussianBlur')
  // G2dMath.gaussianBlur(c1, imageData.width, imageData.height, 4)
  // G2dMath.gaussianBlur(c2, imageData.width, imageData.height, 4)
  // G2dMath.gaussianBlur(c3, imageData.width, imageData.height, 4)
  // console.timeEnd('wasm gaussianBlur')

  console.time('toArray')
  const channelR = c1 // raster.channels.r.toArray()
  const channelG = c2 // raster.channels.g.toArray()
  const channelB = c3 // raster.channels.b.toArray()
  console.timeEnd('toArray')
  console.time('vanilla gaussianBlur')
  gaussianBlur(channelR, imageData.width, imageData.height, 4)
  gaussianBlur(channelG, imageData.width, imageData.height, 4)
  gaussianBlur(channelB, imageData.width, imageData.height, 4)
  console.timeEnd('vanilla gaussianBlur')

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
