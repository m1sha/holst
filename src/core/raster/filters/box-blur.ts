import { Filter } from './filter'
import { IImageData } from './helpers/image-data'
import { PixelArray } from './helpers/pixel-array'

export class BoxBlur implements Filter {
  radius: number

  constructor (radius: number) {
    if (!radius || radius < 1) throw new Error('The radius must be a positive integer and greater than zero')
    this.radius = radius
  }

  apply (imageData: ImageData) {
    const radius = this.radius
    const w = imageData.width
    const h = imageData.height
    const wm = w - 1
    const hm = h - 1
    const wh = w * h
    const div = radius + radius + 1
    const r = new Int32Array(wh)
    const g = new Int32Array(wh)
    const b = new Int32Array(wh)
    let rSum, gSum, bSum, x, y, i, p, p1, p2, yp, yi, yw
    const min = new Int32Array(Math.max(w, h))
    const max = new Int32Array(Math.max(w, h))
    const pixels = new PixelArray(imageData as IImageData)

    const dv = new Int32Array(256 * div)
    for (i = 0; i < 256 * div; i++) {
      dv[i] = (i / div)
    }

    yw = yi = 0

    for (y = 0; y < h; y++) {
      rSum = gSum = bSum = 0

      for (i = -radius; i <= radius; i++) {
        p = pixels.getRGB(yi + Math.min(wm, Math.max(i, 0)))
        rSum += p[0]
        gSum += p[1]
        bSum += p[2]
      }

      for (x = 0; x < w; x++) {
        r[yi] = dv[rSum]
        g[yi] = dv[gSum]
        b[yi] = dv[bSum]

        if (y === 0) {
          min[x] = Math.min(x + radius + 1, wm)
          max[x] = Math.max(x - radius, 0)
        }
        p1 = pixels.getRGB(yw + min[x])
        p2 = pixels.getRGB(yw + max[x])

        rSum += p1[0] - p2[0] // ((p1 & 0xff0000) - (p2 & 0xff0000)) >> 16
        gSum += p1[1] - p2[1] // ((p1 & 0x00ff00) - (p2 & 0x00ff00)) >> 8
        bSum += p1[2] - p2[2] // (p1 & 0x0000ff) - (p2 & 0x0000ff)
        yi++
      }
      yw += w
    }

    for (x = 0; x < w; x++) {
      rSum = gSum = bSum = 0
      yp = -radius * w
      for (i = -radius; i <= radius; i++) {
        yi = Math.max(0, yp) + x
        rSum += r[yi]
        gSum += g[yi]
        bSum += b[yi]
        yp += w
      }
      yi = x
      for (y = 0; y < h; y++) {
        pixels.setU32(yi, 0xff000000 | (dv[rSum] << 16) | (dv[gSum] << 8) | dv[bSum])
        // pixels.setRGB(yi, [dv[rSum], dv[gSum], dv[bSum]])
        if (x === 0) {
          min[y] = Math.min(y + radius + 1, hm) * w
          max[y] = Math.max(y - radius, 0) * w
        }
        p1 = x + min[y]
        p2 = x + max[y]

        rSum += r[p1] - r[p2]
        gSum += g[p1] - g[p2]
        bSum += b[p1] - b[p2]

        yi += w
      }
    }
  }
}
