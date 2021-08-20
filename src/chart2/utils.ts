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

const roundInt = (value: number): number => {
  const sign = value < 0 ? -1 : 1
  const digits = Math.floor(Math.abs(value)).toString()
  const digitCount = digits.length
  if (digitCount === 1) return 10 * sign
  const second = parseInt(digits.charAt(1))
  const major = Math.pow(10, digitCount - 1)
  if (second >= 5) {
    return (parseInt(digits.charAt(0)) + 1) * major * sign
  }
  return ((parseInt(digits.charAt(0) + '5')) * major / 10) * sign
}

export { roundInt, getMax, getMin }

export function getRatio (constraints: Constraints, bounds: Rect): Point {
  const x = bounds.width / (constraints.maxX + constraints.minX)
  const y = bounds.height / (constraints.maxY + Math.abs(constraints.minY))
  return { x, y }
}
