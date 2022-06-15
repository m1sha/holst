import { Point } from '../point'

export function quadratic (p0: Point, p1: Point, p2: Point, t: number): Point {
  const ot2 = (1 - t) * (1 - t)
  const t2 = t * t
  const e1 = p0.dec(p1).mul(ot2)
  const e2 = p2.dec(p1).mul(t2)
  return p0.add(e1).add(e2)
}

export function cubic (p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const ot = (1 - t)
  const ot2 = ot * ot
  const ot3 = (1 - t) * ot2
  const t2 = t * t
  const t3 = t * t2
  const e1 = p0.mul(ot3)
  const e2 = p1.mul(ot2 * 3 * t)
  const e3 = p2.mul(ot * 3 * t2)
  const e4 = p3.mul(t3)
  const r = e1.add(e2).add(e3).add(e4)
  return r
}
