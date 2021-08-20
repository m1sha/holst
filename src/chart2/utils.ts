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

const roundInt = (value: number): number => {
  const sign = value < 0 ? -1 : 1
  const p = Math.abs(value)
  const digits = Math.floor(p).toString()
  const digitCount = digits.length
  if (digitCount === 1) return 10 * sign
  if (p < 25) return 50 * sign
  if (p < 50) return 50 * sign
  if (digitCount === 2) return 100 * sign
  if (p < 150) return 150 * sign
  if (p < 250) return 250 * sign
  if (p < 500) return 500 * sign
  if (p < 750) return 750 * sign
  if (p < 1000) return 1000 * sign
  if (p < 1500) return 1500 * sign
  if (p < 2500) return 2500 * sign
  if (p < 5000) return 5000 * sign
  if (p < 7500) return 7500 * sign
  if (p < 10000) return 10000 * sign
  const major = Math.pow(10, digitCount - 1)
  return ((parseInt(digits.charAt(0)) + 1) * major) * sign
}

export { roundInt, getMax, getMin }

export function getRatio (minX: number, minY: number, maxX: number, maxY: number, bounds: Rect): Point {
  const x = bounds.width / (maxX + minX)
  const y = bounds.height / (maxY + Math.abs(minY))
  return { x, y }
}
