import { Rect } from '../../../src/core/rect'
import { Raster } from '../../../src/core/raster'

export function fooRaster () {
  return new Raster({ width: 0, height: 0, close: () => {} }, new Rect(0, 0, 0, 0), new Rect(0, 0, 0, 0))
}
