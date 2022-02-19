import { Context2DOrientation } from '../src/core/renderer2D'
import { Coords } from '../src/core/coords'
import { size } from '../src/core/utils'
import { Point } from '../src/core/point'

test('Get screen orientation', () => {
  const sourcePoint = new Point(10, 41)
  const sourceSize = size(256, 256)
  const orientations = ['top-left', 'bottom-left', 'top-right', 'bottom-right']
  const expectDist = [
    sourcePoint,
    new Point(sourcePoint.x, sourceSize.height - sourcePoint.y),
    new Point(sourceSize.width - sourcePoint.x, sourcePoint.y),
    new Point(sourceSize.width - sourcePoint.x, sourceSize.height - sourcePoint.y)
  ]
  for (let i = 0; i < expectDist.length; i++) {
    const distPoint = Coords.getScreenOrientation(sourcePoint, sourceSize, orientations[i] as Context2DOrientation)
    const expectPoint = expectDist[i]
    expect(distPoint).toStrictEqual(expectPoint)
  }
})
