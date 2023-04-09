import { ShadowDTO } from './shadow'

export interface TextStyleDTO {
  color?: string
  outlineColor?: string
  outlineWidth?: number
  fontName?: string
  fontSize?: string
  bold? : string
  italic?: boolean
  fontVariant?: string
  fillStrokeOrder?: string
  shadow?: ShadowDTO
}

export interface TextBlockDTO {
  type: 'text',
  style: TextStyleDTO,
  text: string,
  target: { x: number, y: number },
  order: number
  transform?: string
  size?: { width: number, height: number }
  alignment?: string
  verticalAlignment?: string
  baseline?: string
  overflow?: string
  lineHeight?: number
}
