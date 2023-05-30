import { Raster } from '../../raster'
import { RasterDTO } from '../contract/raster'
import { parseTransform } from './parse-transform'
import { ImportOptions } from './import-options'
import { importAnchor } from './import-anchor'
import { internal } from '../../../utils/internal'

export async function importRaster (dto: RasterDTO, options: ImportOptions): Promise<Raster> {
  const name = (options.assets.count + 1) + ''
  options.assets.add(name, dto.src)
  await options.assets.busy
  const result = options.assets.get(name)
  internal<{ id: string }>(result).id = dto.id

  if (dto.distRect) {
    if (dto.distRect.x) result.distRect.x = dto.distRect.x
    if (dto.distRect.y) result.distRect.y = dto.distRect.y
    if (dto.distRect.width) result.distRect.width = dto.distRect.width
    if (dto.distRect.height) result.distRect.height = dto.distRect.height
  }

  if (dto.srcRect) {
    if (dto.srcRect.x) result.srcRect.x = dto.srcRect.x
    if (dto.srcRect.y) result.srcRect.y = dto.srcRect.y
    if (dto.srcRect.width) result.srcRect.width = dto.srcRect.width
    if (dto.srcRect.height) result.srcRect.height = dto.srcRect.height
  }

  if (dto.order) result.order = dto.order
  if (dto.transform) result.injectTransform(parseTransform(dto.transform))

  if (dto.anchor) {
    const anchorDto = options.anchorsDto.find(p => p.id === dto.anchor)
    if (!anchorDto) throw new Error('anchor is not fround')
    result.setAnchor(importAnchor(anchorDto, options.anchors, options.drawables))
  }

  return result
}
