import { Group } from '../../group'
import { GroupDTO } from '../contract/group'
import { importShape } from './import-shape'
import { importTextBlock } from './import-text-block'

export function importGroup (dto: GroupDTO): Group {
  const result = Group.create()
  for (const drawable of dto.items) {
    if (drawable.type === 'shape') result.add(importShape(drawable))
    if (drawable.type === 'text') result.add(importTextBlock(drawable))
    if (drawable.type === 'group') result.add(importGroup(drawable))
  }

  return result
}
