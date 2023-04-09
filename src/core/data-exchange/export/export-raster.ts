import { Raster } from '../../raster'
import { RasterDTO } from '../contract/raster'

export function exportRaster (raster: Raster): RasterDTO {
  let src = ''
  if (raster.src instanceof Image) {
    src = raster.src.src
  } else {
    // src = toBase64(raster.src)
  }

  const result: RasterDTO = { type: 'raster', src, order: raster.order, srcRect: raster.srcRect, distRect: raster.distRect }

  return result
}
