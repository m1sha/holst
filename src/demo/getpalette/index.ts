import { Color } from 'index'

export function getPalette (img: HTMLImageElement, canvas: HTMLCanvasElement, discrete: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  console.log('drawImage')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, img.naturalWidth, img.naturalHeight)
  console.log('drawImage got')
  console.log('getImageData')
  const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
  const imageData2 = ctx.createImageData(img.naturalWidth, img.naturalHeight)
  console.log('getImageData got')

  // const discrete = 240
  const list: Color[] = []
  const hash: Pixel[] = []
  const length = imageData.data.length
  for (let i = 0; i < length; i += 4) {
    const r = imageData.data[i]
    const g = imageData.data[i + 1]
    const b = imageData.data[i + 2]
    const a = imageData.data[i + 3]

    const hr = Math.floor(r / discrete)
    const hg = Math.floor(g / discrete)
    const hb = Math.floor(b / discrete)

    const index = hash.findIndex(p => p.equals(hr, hg, hb, a))

    imageData2.data[i] = list[index] ? list[index].r : r
    imageData2.data[i + 1] = list[index] ? list[index].g : g
    imageData2.data[i + 2] = list[index] ? list[index].b : b
    imageData2.data[i + 3] = a
    if (index > -1) {
      continue
    }

    hash.push(new Pixel(hr, hg, hb, 0))
    list.push(new Color(r, g, b, 1))
  }

  const canvas2 = document.createElement('canvas')
  canvas2.width = canvas.width
  canvas2.height = canvas.height
  canvas2
    .getContext('2d')?.putImageData(imageData2, 0, 0)

  const image = canvas2.toDataURL()
  return {
    list: list.sort((a, b) => rgbToInt(a) - rgbToInt(b)),
    image
  }
}

const rgbToInt = ({ r, g, b }: Color) : number => {
  let rgb = r
  rgb = (rgb << 8) + g
  rgb = (rgb << 8) + b
  return rgb
}

class Pixel {
  r: number
  g: number
  b: number
  a: number
  constructor (r: number, g: number, b: number, a: number) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  equals (r: number, g: number, b: number, a: number) {
    return this.r === r && this.g === g && this.b === b // && this.a === a
  }
}
