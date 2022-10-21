import { Point } from '../geometry/point'
import { SvgPathDElement } from './svg-path-d-element'

export function parseSvgPathD (d: string): SvgPathDElement[] {
  if (!d) throw new Error('The d parameter must not be empty')
  const parseParams = (i: number, d: string) => {
    let res = ''
    while (true) {
      const chr = d.charAt(i)
      if (!/[0-9-.,e ]/.test(chr)) break
      res += chr
      i++
      if (i >= d.length) break
    }
    return {
      i,
      params: res.split(' ').filter(p => p.length > 0).map(p => parseFloat(p))
    }
  }
  const assert = (chr: string, i: number, params: number[], count: number) => {
    if (!params || params.length !== count || params.some(p => isNaN(p))) throw new Error(`invalid parameters. Attribute ${chr} at ${i}`)
  }
  let i = 0
  const result: SvgPathDElement[] = []
  while (i < d.length) {
    const chr = d.charAt(i)
    switch (chr) {
      case 'M':
      case 'm': {
        const res = parseParams(i + 1, d)
        assert(chr, i, res.params, 2)
        i = res.i
        const x = res.params[0]
        const y = res.params[1]
        result.push({ type: chr, point: new Point(x, y) })
        continue
      }
      case 'L':
      case 'l': {
        const res = parseParams(i + 1, d)
        assert(chr, i, res.params, 2)
        i = res.i
        const x = res.params[0]
        const y = res.params[1]
        result.push({ type: chr, point: new Point(x, y) })
        continue
      }
      case 'H':
      case 'h': {
        const res = parseParams(i + 1, d)
        assert(chr, i, res.params, 1)
        i = res.i
        const width = res.params[0]
        result.push({ type: chr, width })
        continue
      }
      case 'V':
      case 'v': {
        const res = parseParams(i + 1, d)
        assert(chr, i, res.params, 1)
        i = res.i
        const height = res.params[0]
        result.push({ type: chr, height })
        continue
      }
      case 'C':
      case 'c': {
        const res = parseParams(i + 1, d)
        assert(chr, i, res.params, 6)
        i = res.i
        const x1 = res.params[0]
        const y1 = res.params[1]
        const x2 = res.params[2]
        const y2 = res.params[3]
        const x = res.params[4]
        const y = res.params[5]
        result.push({ type: chr, point1: new Point(x1, y1), point2: new Point(x2, y2), point: new Point(x, y) })
        continue
      }
      case 'Z':
      case 'z': {
        const res = parseParams(i + 1, d)
        i = res.i
        result.push({ type: chr })
        continue
      }
      case ' ':
        i++
        continue
    }

    throw new Error(`Invalid char ${chr} at ${i} position. ${d}`)
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
      case 'L':
      case 'l':
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
      case 'C':
      case 'c':
        result += `${item.type}${item.point1.x},${item.point1.y} ${item.point2.x},${item.point2.y} ${item.point.x},${item.point.y}`
        continue
      case 'Z':
      case 'z':
        result += item.type
        continue
    }
  }
  return result
}
