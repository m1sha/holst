import { Raster } from '../../raster'
import { AnchorDTO } from '../contract/anchor'
import { RasterDTO } from '../contract/raster'
import { exportAnchor } from './export-anchor'

export function exportRaster (raster: Raster, anchors: AnchorDTO[]): RasterDTO {
  let src = ''
  if (raster.src instanceof Image) {
    src = raster.src.src
  } else {
    // src = toBase64(raster.src)
  }

  const result: RasterDTO = {
    type: 'raster',
    id: raster.id,
    name: raster.name,
    anchor: raster.anchor ? exportAnchor(raster.anchor, anchors) : undefined,
    src,
    order: raster.order,
    srcRect: raster.srcRect,
    distRect: raster.distRect
  }

  return result
}
