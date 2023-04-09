import { TextBlock } from '../../label'
import { DrawableDTO } from '../contract/drawable'
import { exportTextStyle } from './export-text-style'
import { exportTransform } from './export-transform'

export function exportTextBlock (textBlock: TextBlock): DrawableDTO {
  const r: DrawableDTO = {
    type: 'text',
    style: exportTextStyle(textBlock.style),
    order: textBlock.order,
    text: textBlock.text,
    target: textBlock.target,
    transform: exportTransform(textBlock.getTransform()) || undefined
  }
  return r
}
