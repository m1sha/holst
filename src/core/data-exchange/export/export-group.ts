import { Group } from '../../group'
import { GroupDTO } from '../contract/group'
import { exportRaster } from './export-raster'
import { exportShape } from './export-shape'
import { exportTextBlock } from './export-text-block'
import { Raster } from '../../raster'
import { TextBlock } from '../../label'
import Shape from '../../shape'
import { AnchorDTO } from '../contract/anchor'

export function exportGroup (group: Group, anchors: AnchorDTO[]): GroupDTO {
  const result: GroupDTO = { type: 'group', id: group.id, name: group.name, items: [] }

  for (const drawable of group.items) {
    switch (drawable.type) {
      case 'shape':
        result.items.push(exportShape(drawable as Shape, anchors))
        break
      case 'text':
        result.items.push(exportTextBlock(drawable as TextBlock, anchors))
        break
      case 'raster':
        result.items.push(exportRaster(drawable as Raster, anchors))
        break
      case 'group':
        result.items.push(exportGroup(drawable as Group, anchors))
        break
    }
  }

  return result
}
