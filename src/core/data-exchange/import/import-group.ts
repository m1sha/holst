import { Group } from '../../group'
import { GroupDTO } from '../contract/group'
import { importShape } from './import-shape'
import { importTextBlock } from './import-text-block'
import { importRaster } from './import-raster'
import { ImportOptions } from './import-options'
import { internal } from '../../../utils/internal'

export async function importGroup (dto: GroupDTO, options: ImportOptions): Promise<Group> {
  const result = Group.create(dto.name)
  internal<{ id: string }>(result).id = dto.id
  // result.order = dto.order
  for (const drawable of dto.items) {
    switch (drawable.type) {
      case 'shape': {
        const item = importShape(drawable, options)
        result.add(item)
        options.drawables.push(item)
        break
      }
      case 'text': {
        const item = importTextBlock(drawable, options)
        result.add(item)
        options.drawables.push(item)
        break
      }
      case 'raster': {
        const item = await importRaster(drawable, options)
        result.add(item)
        options.drawables.push(item)
        break
      }
      case 'group':
        result.add(await importGroup(drawable, options))
        break
    }
  }

  return result
}
