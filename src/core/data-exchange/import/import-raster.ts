import { Raster } from '../../raster'
import { RasterDTO } from '../contract/raster'
import { Assets } from '../../assets'
import { parseTransform } from './parse-transform'

export async function importRaster (dto: RasterDTO, assets: Assets): Promise<Raster> {
  const name = (assets.count + 1) + ''
  assets.add(name, dto.src)
  await assets.busy
  const result = assets.get(name)

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

  return result
}
