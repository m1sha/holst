import { TextBlock } from '../../label'
import { AnchorDTO } from '../contract/anchor'
import { DrawableDTO } from '../contract/drawable'
import { exportAnchor } from './export-anchor'
import { exportTextStyle } from './export-text-style'
import { exportTransform } from './export-transform'

export function exportTextBlock (textBlock: TextBlock, anchors: AnchorDTO[]): DrawableDTO {
  const r: DrawableDTO = {
    type: 'text',
    id: textBlock.id,
    name: textBlock.name,
    style: exportTextStyle(textBlock.style),
    order: textBlock.order,
    anchor: textBlock.anchor ? exportAnchor(textBlock.anchor, anchors) : undefined,
    text: textBlock.text,
    target: textBlock.target,
    transform: exportTransform(textBlock.getTransform()) || undefined
  }
  return r
}
