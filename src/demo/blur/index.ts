import { gaussianBlur } from '../../core/raster/gaussian-blur'
import { Assets, Scene, Renderer2D } from 'index'

export async function createBlurDemo (div: HTMLDivElement) {
  const assets = new Assets()
  assets.add('swamp', '/img/swamp.png')
  await assets.busy
  const raster = assets.get('swamp')
  raster.distRect = raster.srcRect

  // const img = document.createElement('img')
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 1000
  div.appendChild(canvas)
  // img.src = raster.src

  const scene = new Scene()
  const layer = scene.createLayer()
  const d = raster.getData()

  const arrR1 = []
  const arrR2 = []

  const arrG1 = []
  const arrG2 = []

  const arrB1 = []
  const arrB2 = []

  for (let i = 0; i < d.data.length; i += 4) {
    arrR1.push(d.data[i + 0])
    arrR2.push(0)

    arrG1.push(d.data[i + 1])
    arrG2.push(0)

    arrB1.push(d.data[i + 2])
    arrB2.push(0)
  }

  gaussianBlur(arrR1, arrR2, d.width, d.height, 5)
  gaussianBlur(arrG1, arrG2, d.width, d.height, 5)
  gaussianBlur(arrB1, arrB2, 800, 800, 10)

  let c = 0
  for (let i = 0; i < d.data.length; i += 4) {
    d.data[i + 0] = Math.min(255, Math.max(0, arrR1[c]))
    d.data[i + 1] = Math.min(255, Math.max(0, arrG1[c]))
    d.data[i + 2] = Math.min(255, Math.max(0, arrB1[c]))
    c++
  }

  raster.setData(d)

  layer.createImage(raster)

  // layer.createShape({ fill: '#333' }).circle({ x: 90, y: 89 }, 10)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
}
