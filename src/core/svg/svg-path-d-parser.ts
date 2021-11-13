import { point } from '../utils'
import { SvgPathDElement } from './svg-path-d-element'

export function parseSvgPathD (d: string): SvgPathDElement[] {
  if (!d) throw new Error('The d parameter must not be empty')
  const parseParams = (i: number, d: string) => {
    let res = ''
    while (true) {
      const chr = d.charAt(i)
      if (!/[0-9-., ]/.test(chr)) break
      res += chr
      i++
      if (i >= d.length) break
    }
    return {
      i,
      params: res.split(' ').filter(p => p.length > 0)
    }
  }
  let i = 0
  const result: SvgPathDElement[] = []
  while (i < d.length) {
    const chr = d.charAt(i)
    switch (chr) {
      case 'M':
      case 'm': {
        const res = parseParams(i + 1, d)
        i = res.i
        const x = parseFloat(res.params[0])
        const y = parseFloat(res.params[1])
        result.push({ type: chr, point: point(x, y) })
        continue
      }
      case 'H':
      case 'h': {
        const res = parseParams(i + 1, d)
        i = res.i
        const width = parseFloat(res.params[0])
        result.push({ type: chr, width })
        continue
      }
      case 'V':
      case 'v': {
        const res = parseParams(i + 1, d)
        i = res.i
        const height = parseFloat(res.params[0])
        result.push({ type: chr, height })
        continue
      }
      case ' ':
        i++
        continue
    }

    throw new Error(`Invalid char ${chr} at ${i} position`)
  }

  return result
}

export function toSvgPathD (items: SvgPathDElement[]) {
  let result = ''
  for (const item of items) {
    switch (item.type) {
      case 'M':
      case 'm':
        result += `${item.type}${item.point.x} ${item.point.y}`
        continue
      case 'H':
      case 'h':
        result += item.type + item.width
        continue
      case 'V':
      case 'v':
        result += item.type + item.height
        continue
    }
  }
  return result
}
