type hsv = { h: number, s: number, v: number }
type rgb = { r: number, g: number, b: number }
export default {

  hsl2rgb (h: number, s: number, l: number): rgb {
    const ch = h >= 0 && h <= 360
    const cs = s >= 0 && s <= 1
    const cl = l >= 0 && l <= 1
    if (!ch || !cs || !cl) throw new Error(`hsl2rgb: h:${h} s:${s} l:${l} ch:${ch} cs:${cs} cl:${cl}`)
    const result: rgb = { r: 0, g: 0, b: 0 }

    const c = (1 - (2 * l - 1)) * s
    const hh = h / 60
    const x = c * 1 - ((hh % 2) - 1)
    if (hh >= 0 && hh < 1) {
      result.r = c
      result.g = x
      result.b = 0
    }
    if (hh >= 1 && hh < 2) {
      result.r = x
      result.g = c
      result.b = 0
    }
    if (hh >= 2 && hh < 3) {
      result.r = 0
      result.g = c
      result.b = x
    }
    if (hh >= 3 && hh < 4) {
      result.r = 0
      result.g = x
      result.b = c
    }
    if (hh >= 4 && hh < 5) {
      result.r = x
      result.g = 0
      result.b = c
    }
    if (hh >= 5 && hh < 6) {
      result.r = c
      result.g = 0
      result.b = x
    }
    const m = l - (c / 2)
    result.r = Math.floor((result.r + m) * 100)
    result.g = Math.floor((result.g + m) * 100)
    result.b = Math.floor((result.b + m) * 100)
    return result
  },

  hsv2rgb (h: number, s: number, v: number) {
    let H = h / 360
    const S = s / 100
    let V = v / 100
    let R = 0
    let G = 0
    let B = 0
    let A = 0
    let C, D
    if (S === 0) {
      R = G = B = Math.round(V * 255)
    } else {
      if (H >= 1) H = 0
      H = 6 * H
      D = H - Math.floor(H)
      A = Math.round(255 * V * (1 - S))
      B = Math.round(255 * V * (1 - (S * D)))
      C = Math.round(255 * V * (1 - (S * (1 - D))))
      V = Math.round(255 * V)
      switch (Math.floor(H)) {
        case 0:
          R = V
          G = C
          B = A
          break
        case 1:
          R = B
          G = V
          B = A
          break
        case 2:
          R = A
          G = V
          B = C
          break
        case 3:
          R = A
          G = B
          B = V
          break
        case 4:
          R = C
          G = A
          B = V
          break
        case 5:
          R = V
          G = A
          // B = B
          break
      }
    }
    return {
      r: R || 0,
      g: G || 0,
      b: B || 0
    }
  },

  rgb2hsv (r: number, g: number, b: number): hsv {
    let computedH = 0
    let computedS = 0
    let computedV = 0

    if (r == null || g == null || b == null ||
        isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error('Please enter numeric RGB values!')
    }
    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
      throw new Error('RGB values must be in the range 0 to 255.')
    }
    r = r / 255; g = g / 255; b = b / 255
    const minRGB = Math.min(r, Math.min(g, b))
    const maxRGB = Math.max(r, Math.max(g, b))

    // Black-gray-white
    if (minRGB === maxRGB) {
      computedV = minRGB
      return { h: 0, s: 0, v: computedV }
    }

    // Colors other than black-gray-white:
    const d = (r === minRGB) ? g - b : ((b === minRGB) ? r - g : b - r)
    const h = (r === minRGB) ? 3 : ((b === minRGB) ? 1 : 5)
    computedH = 60 * (h - d / (maxRGB - minRGB))
    computedS = (maxRGB - minRGB) / maxRGB
    computedV = maxRGB
    return { h: computedH, s: computedS, v: computedV }
  },

  hsl2hsv (h: number, s: number, l: number): hsv {
    const result: hsv = { h, s: 0, v: 0 }
    result.v = l + s * Math.min(l, 1 - l)
    result.s = result.v === 0 ? 0 : 2 * (1 - l / result.v)
    return result
  },

  hex2rgb (hex: string): rgb {
    if (hex.charAt(0) !== '#') throw new Error('hex must start with # character')
    if (hex.length === 4) {
      const r = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16)
      const g = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16)
      const b = parseInt(hex.substring(3, 4) + hex.substring(3, 4), 16)
      return { r, g, b }
    }
    if (hex.length === 7) {
      const r = parseInt(hex.substring(1, 3), 16)
      const g = parseInt(hex.substring(3, 5), 16)
      const b = parseInt(hex.substring(5, 7), 16)
      return { r, g, b }
    }
    throw new Error('hex length is invalid')
  }
}
