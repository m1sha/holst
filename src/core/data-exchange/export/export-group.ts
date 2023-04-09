import { Group } from '../../group'
import { GroupDTO } from '../contract/group'
import { exportRaster } from './export-raster'
import { exportShape } from './export-shape'
import { exportTextBlock } from './export-text-block'
import { Raster } from '../../raster'
import { TextBlock } from '../../label'
import Shape from '../../shape'

export function exportGroup (group: Group): GroupDTO {
  const result: GroupDTO = { type: 'group', name: group.name, items: [] }

  for (const drawable of group.items) {
    switch (drawable.type) {
      case 'shape':
        result.items.push(exportShape(drawable as Shape))
        break
      case 'text':
        result.items.push(exportTextBlock(drawable as TextBlock))
        break
      case 'raster':
        result.items.push(exportRaster(drawable as Raster))
        break
      case 'group':
        result.items.push(exportGroup(drawable as Group))
        break
    }
  }

  return result
}
