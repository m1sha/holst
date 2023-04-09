import { TextBlockDTO } from '../contract/text-block'
import { importTextStyle } from './import-text-style'
import { parseTransform } from './parse-transform'
import { Baseline, Overflow, TextAlignment, TextVerticalAlignment, TextBlock } from '../../label'

export function importTextBlock (dto: TextBlockDTO): TextBlock {
  const style = importTextStyle(dto.style)
  const result = TextBlock.create(dto.text, style)
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
  return result
}
