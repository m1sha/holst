import { Color, BitmapReader, BitmapWriter } from 'index'

export function getPalette (img: HTMLImageElement, canvas: HTMLCanvasElement, discrete: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  console.log('drawImage')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, img.naturalWidth, img.naturalHeight)

  const srcImageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
  const distImageData = ctx.createImageData(img.naturalWidth, img.naturalHeight)

  const list: Color[] = []
  const hash: Pixel[] = []
  const reader = new BitmapReader(srcImageData)
  const writer = new BitmapWriter(distImageData)
  const counter: Record<number, number> = {}
  reader.read((rgba, i) => {
    const { r, g, b, a } = rgba
    const hr = Math.floor(r / discrete)
    const hg = Math.floor(g / discrete)
    const hb = Math.floor(b / discrete)

    const index = hash.findIndex(p => p.equals(hr, hg, hb, a))
    const color = new Color(r, g, b, 1)
    const cc = color.value
    counter[cc] = counter[cc] ? counter[cc]++ : 1

    const newColor = list[index] ? list[index] : color
    writer.write({ r: newColor.r, g: newColor.g, b: newColor.b, a }, i)
    if (index > -1) {
      return
    }

    hash.push(new Pixel(hr, hg, hb, 0))
    list.push(new Color(r, g, b, 1))
  })

  const ff = Object.entries(counter).sort((a, b) => b[1] - a[1]).map(p => p[0])
  const hh: number[] = []
  for (let ii = 0; ii < 256; ii++) hh[ii] = Number(ff[ii])

  const canvas2 = document.createElement('canvas')
  canvas2.width = canvas.width
  canvas2.height = canvas.height
  canvas2
    .getContext('2d')?.putImageData(distImageData, 0, 0)

  const image = canvas2.toDataURL()
  return {
    list: list.filter(p => hh.indexOf(p.value) > -1).sort((a, b) => a.toHSV().v - b.toHSV().v),
    image
  }
}

export function whiteColor () {
  return new Color('#ffffff')
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
