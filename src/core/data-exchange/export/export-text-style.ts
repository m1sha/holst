import { TextStyle } from '../../styles/label-style'
import { TextStyleDTO } from '../contract/text-block'
import { exportShadow } from './export-shadow'

export function exportTextStyle (style: TextStyle): TextStyleDTO {
  return {
    color: style.color ? (typeof style.color === 'string' ? style.color : style.color.toString()) : undefined,
    bold: (typeof style.bold === 'boolean' ? (style.bold ? '500' : undefined) : (style.bold === 'normal') ? undefined : style.bold) || undefined,
    fontSize: style.fontSize,
    fontName: style.fontName && style.fontName !== 'serif' ? style.fontName : undefined,
    italic: style.italic === true ? true : undefined,
    fontVariant: style.fontVariant && style.fontVariant !== 'normal' ? style.fontVariant : undefined,
    shadow: style.shadow ? exportShadow(style.shadow) : undefined
  }
}
