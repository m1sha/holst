import { Color } from 'index'

export function getPalette (img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  console.log('drawImage')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, img.naturalWidth, img.naturalHeight)
  console.log('drawImage got')
  console.log('getImageData')
  const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
  console.log('getImageData got')

  const discrete = 60
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
    if (hash.filter(p => p.equals(hr, hg, hb, a))[0]) {
      continue
    }

    hash.push(new Pixel(hr, hg, hb, 0))
    list.push(new Color(r, g, b, 1))
  }

  return list.sort((a, b) => rgbToInt(a) - rgbToInt(b))
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
