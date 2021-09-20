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
  if (value < 9) return Math.floor(Math.abs(value)) + 1
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
  let y = bounds.height / constraints.maxY
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
