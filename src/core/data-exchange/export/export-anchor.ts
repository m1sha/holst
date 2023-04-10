import { Anchor } from '../../anchor'
import { AnchorDTO } from '../contract/anchor'

export function exportAnchor (anchor: Anchor, anchors: AnchorDTO[]): string {
  let dto = anchors.find(a => a.id === anchor.id)
  if (dto) return dto.id
  dto = {
    id: anchor.id,
    containerId: anchor.container!.id
  }

  anchors.push(dto)

  return dto.id
}
