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

    const newColor = list[index] ? list[index] : new Color(r, g, b, 1)

    imageData2.data[i] = newColor.r
    imageData2.data[i + 1] = newColor.g
    imageData2.data[i + 2] = newColor.b
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

  const grouped = groupByHue(list.sort((a, b) => a.value - b.value))
  const outList = groupBySaturation(grouped)
  const image = canvas2.toDataURL()
  return {
    list: outList,
    image
  }
}

const groupByHue = (list: Color[]) => {
  const result: Record<number, Color[]> = {}
  for (const item of list) {
    const h = item.toHSV().h
    if ((h >= 0 && h < 90) || (h >= 330 && h < 360)) {
      if (!result[0]) result[0] = []
      result[0].push(item)
    }
    if (h >= 90 && h < 150) {
      if (!result[1]) result[1] = []
      result[1].push(item)
    }
    if (h >= 150 && h < 210) {
      if (!result[2]) result[2] = []
      result[2].push(item)
    }
    if (h >= 210 && h < 270) {
      if (!result[3]) result[3] = []
      result[3].push(item)
    }
    if (h >= 270 && h < 330) {
      if (!result[4]) result[4] = []
      result[4].push(item)
    }
  }
  return result
}

export function whiteColor () {
  return new Color('#ffffff')
}

export function blackColor () {
  return new Color('#000000')
}

const groupBySaturation = (grouped: Record<number, Color[]>) => {
  const groupBy = (colors: Color[]) => {
    const result: Record<number, Color[]> = {}
    for (const i of colors) {
      const s = i.toHSV().s
      if (s < 15) {
        if (!result[0]) result[0] = []
        result[0].push(i)
      }
      if (s > 15 && s < 30) {
        if (!result[1]) result[1] = []
        result[1].push(i)
      }
      if (s >= 30 && s < 60) {
        if (!result[2]) result[2] = []
        result[2].push(i)
      }
      if (s >= 60 && s < 80) {
        if (!result[3]) result[3] = []
        result[3].push(i)
      }
      if (s >= 80 && s <= 100) {
        if (!result[4]) result[4] = []
        result[4].push(i)
      }
    }
    return result
  }
  const final: Color[] = []
  for (const key of Object.keys(grouped)) {
    const group = grouped[+key]
    const gsList = groupBy(group)
    for (const keyS of Object.keys(gsList)) {
      final.push(...gsList[+keyS].sort((a, b) => a.toHSV().v - b.toHSV().v))
    }
  }
  return final
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
