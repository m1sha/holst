import { Context2DOrientation } from '../src/core/context2d'
import { Coords } from '../src/core/coords'
import { point, size } from '../src/core/utils'

test('Get screen orientation', () => {
  const sourcePoint = point(10, 41)
  const sourceSize = size(256, 256)
  const orientations = ['top-left', 'bottom-left', 'top-right', 'bottom-right']
  const expectDist = [
    sourcePoint,
    point(sourcePoint.x, sourceSize.height - sourcePoint.y),
    point(sourceSize.width - sourcePoint.x, sourcePoint.y),
    point(sourceSize.width - sourcePoint.x, sourceSize.height - sourcePoint.y)
  ]
  for (let i = 0; i < expectDist.length; i++) {
    const distPoint = Coords.getScreenOrientation(sourcePoint, sourceSize, orientations[i] as Context2DOrientation)
    const expectPoint = expectDist[i]
    expect(distPoint).toStrictEqual(expectPoint)
  }
})
