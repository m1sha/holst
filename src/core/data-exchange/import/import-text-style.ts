import { TextStyleDTO } from '../contract/text-block'
import { parseShadow } from './parse-shadow'
import { FontVariant, FontWeight, TextStyle } from '../../styles/label-style'
import { FillStrokeOrder } from '../../styles/fill-stroke-order'

export function importTextStyle (style: TextStyleDTO): TextStyle {
  return {
    bold: style.bold as FontWeight,
    color: style.color,
    fillStrokeOrder: style.fillStrokeOrder as FillStrokeOrder,
    fontName: style.fontName,
    fontSize: style.fontSize,
    fontVariant: style.fontVariant as FontVariant,
    italic: style.italic,
    outlineColor: style.outlineColor,
    outlineWidth: style.outlineWidth,
    shadow: style.shadow ? parseShadow(style.shadow) : undefined
  }
}
