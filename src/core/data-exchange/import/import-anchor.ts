import { Drawable } from '../../drawable'
import { Anchor } from '../../anchor'
import { AnchorDTO } from '../contract/anchor'
import { internal } from '../../../utils/internal'

export function importAnchor (dto: AnchorDTO, anchors: Anchor[], drawables: Drawable[]): Anchor {
  let anchor = anchors.find(a => a.id === dto.id)
  if (anchor) return anchor

  const container = drawables.find(p => p.id === dto.containerId)
  if (!container) throw new Error('container is not found for the anchor ' + dto.id)
  anchor = Anchor.create(container)
  internal<{ id: string }>(anchor).id = dto.id
  return anchor
}
