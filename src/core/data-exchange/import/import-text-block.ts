import { TextBlockDTO } from '../contract/text-block'
import { importTextStyle } from './import-text-style'
import { parseTransform } from './parse-transform'
import { Baseline, Overflow, TextAlignment, TextVerticalAlignment, TextBlock } from '../../label'
import { ImportOptions } from './import-options'
import { importAnchor } from './import-anchor'
import { internal } from '../../../utils/internal'

export function importTextBlock (dto: TextBlockDTO, options: ImportOptions): TextBlock {
  const style = importTextStyle(dto.style)
  const result = TextBlock.create(dto.text, style)
  internal<{ id: string }>(result).id = dto.id
  result.order = dto.order
  result.target = dto.target
  if (dto.alignment) result.alignment = dto.alignment as TextAlignment
  if (dto.verticalAlignment) result.verticalAlignment = dto.verticalAlignment as TextVerticalAlignment
  if (dto.baseline) result.baseline = dto.baseline as Baseline
  if (dto.overflow) result.overflow = dto.overflow as Overflow
  if (dto.lineHeight || dto.lineHeight === 0) result.lineHeight = dto.lineHeight
  if (dto.size) result.size = dto.size
  if (dto.transform) {
    result.injectTransform(parseTransform(dto.transform))
  }

  if (dto.anchor) {
    const anchorDto = options.anchorsDto.find(p => p.id === dto.anchor)
    if (!anchorDto) throw new Error('anchor is not fround')
    result.setAnchor(importAnchor(anchorDto, options.anchors, options.drawables))
  }

  return result
}
