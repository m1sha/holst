import { Constraints } from '../core/constraints'
import { Point } from '../core/point'
import { Rect } from '../core/rect'

const getMax = (items: [], field: string): number => {
  let result = Number.NEGATIVE_INFINITY
  for (let i = 0; i < items.length; i++) {
    const value = items[i][field]
    if (value > result) result = value
  }
  return result
}
const getMin = (items: [], field: string): number => {
  let result = Number.POSITIVE_INFINITY
  for (let i = 0; i < items.length; i++) {
    const value = items[i][field]
    if (value < result) result = value
  }
  return result
}

export { getMax, getMin }

export function getRatio (constraints: Constraints, bounds: Rect): Point {
  const x = bounds.width / (constraints.maxX + constraints.minX)
  let y = bounds.height / (constraints.maxY - constraints.minY)
  if (constraints.minY < 0) {
    y = bounds.height / (constraints.maxY + Math.abs(constraints.minY))
  }
  return { x, y }
}

export function toDisplayText (num: number) {
  const isInt = (n: number) => Number(n) === n && n % 1 === 0
  if (isInt(num)) return num.toString()
  return num.toFixed(2).toString()
}
