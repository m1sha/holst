import { IImageData } from './filters/helpers/image-data'
import { PixelArray } from './filters/helpers/pixel-array'
import { IPoint } from '../geometry/point'
import { Color } from '../colors/color'
import { Rect } from '../geometry/rect'

export function fillRegion (imageData: IImageData, startPoint: IPoint, color: Color) {
  const pixels = new PixelArray(imageData)
  const newColor = color.value
  const prevColor = getPixel(startPoint, pixels)
  if (prevColor === newColor) return

  const bound = getBounds(imageData)
  const points: IPoint[] = []
  points.push(startPoint)

  while (points.length) {
    const point = points.pop()!
    setPixel(point, newColor, pixels)

    for (const shiftPoint of [moveTop(point), moveRight(point), moveBottom(point), moveLeft(point)]) {
      checkPoint(shiftPoint, points, pixels, bound, newColor, prevColor)
    }
  }
}

function checkPoint (point: IPoint, points: IPoint[], pixels: PixelArray, bound: Rect, newColor: number, prevColor: number) {
  if (bound.intersectsPoint(point)) {
    const c = getPixel(point, pixels)
    if (c === newColor || c !== prevColor) return
    points.push(point)
  }
}

const moveTop = ({ x, y }: IPoint, step: number = 1) => ({ x, y: y - step })
const moveBottom = ({ x, y }: IPoint, step: number = 1) => ({ x, y: y + step })
const moveLeft = ({ x, y }: IPoint, step: number = 1) => ({ x: x - step, y })
const moveRight = ({ x, y }: IPoint, step: number = 1) => ({ x: x + step, y })

const getPixel = (point: IPoint, pixels: PixelArray) => pixels.getU32(pixels.getIndex(point))
const setPixel = (point: IPoint, color: number, pixels: PixelArray) => pixels.setU32(pixels.getIndex(point), color)

const getBounds = (imageData: IImageData) => new Rect(0, 0, imageData.width, imageData.height)
