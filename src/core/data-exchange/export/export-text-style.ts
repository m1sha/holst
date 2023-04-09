import { TextStyle } from '../../styles/label-style'
import { TextStyleDTO } from '../contract/text-block'

export function exportTextStyle (style: TextStyle): TextStyleDTO {
  return {
    color: style.color ? (typeof style.color === 'string' ? style.color : style.color.toString()) : undefined,
    bold: (typeof style.bold === 'boolean' ? (style.bold ? '500' : undefined) : (style.bold === 'normal') ? undefined : style.bold) || undefined,
    fontSize: style.fontSize,
    fontName: style.fontName,
    italic: style.italic,
    fontVariant: style.fontVariant
  }
}
