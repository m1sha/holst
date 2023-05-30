import { Point } from '../geometry/point'

export function quadratic (p0: Point, p1: Point, p2: Point, t: number): Point {
  const nigT = (1 - t)
  const nigTSq = nigT * nigT
  const nigT2 = nigT * 2 * t
  const tSq = t * t
  const e1 = p0.mul(nigTSq)
  const e2 = p1.mul(nigT2)
  const e3 = p2.mul(tSq)
  return e1.add(e2).add(e3)
}

export function cubic (p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const nigT = (1 - t)
  const nigTSq = nigT * nigT
  const nigTCb = nigT * nigTSq
  const tSq = t * t
  const tCb = t * tSq
  const e1 = p0.mul(nigTCb)
  const e2 = p1.mul(nigTSq * 3 * t)
  const e3 = p2.mul(nigT * 3 * tSq)
  const e4 = p3.mul(tCb)
  const r = e1.add(e2).add(e3).add(e4)
  return r
}

export function getPointsOnQuadraticCurve (p0: Point, p1: Point, p2: Point, n: number): Point[] {
  const result: Point[] = []
  const d = 1.0 / n
  let t = d
  while (t < 1.0) {
    result.push(quadratic(p0, p1, p2, t))
    t += d
  }
  return result
}

export function getPointsOnCubicCurve (p0: Point, p1: Point, p2: Point, p3: Point, n: number): Point[] {
  const result: Point[] = []
  const d = 1.0 / n
  let t = d
  while (t < 1.0) {
    result.push(cubic(p0, p1, p2, p3, t))
    t += d
  }
  return result
}
