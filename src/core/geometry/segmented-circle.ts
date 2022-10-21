import { IPoint } from '../geometry/point'

export function drawSegmentedCircle (cx: number, cy: number, radius: number, segmentCount: number, smooth: number): IPoint[] {
  const PI2 = Math.PI * 2
  const sweep = PI2 / segmentCount
  const result: IPoint[] = []
  const side0 = createSegment(cx, cy, radius, 0, sweep)
  result.push(side0.p0)

  for (let i = 0; i < segmentCount; i++) {
    const segment = createSegment(cx, cy, radius, i, sweep)
    const cp = { x: lerp(segment.mid.x, segment.cp.x, smooth), y: lerp(segment.mid.y, segment.cp.y, smooth) }
    result.push(cp)
    result.push(segment.p2)
  }

  return result
}

function createSegment (cx: number, cy: number, radius: number, n: number, sweep: number) {
  const circumference = (cx: number, cy: number, r: number, a: number) => ({
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a)
  })
  const sAngle = sweep * (n - 1)
  const eAngle = sweep * n
  const p0 = circumference(cx, cy, radius, sAngle)
  const p1 = circumference(cx, cy, radius, (eAngle + sAngle) / 2)
  const p2 = circumference(cx, cy, radius, eAngle)
  const mid = { x: lerp(p0.x, p2.x, 0.5), y: lerp(p0.y, p2.y, 0.5) }
  const cp = { x: 2 * p1.x - p0.x / 2 - p2.x / 2, y: 2 * p1.y - p0.y / 2 - p2.y / 2 }

  return { p0, p2, mid, cp }
}

const lerp = (a: number, b: number, x: number) => a + x * (b - a)
