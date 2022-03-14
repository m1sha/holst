// /* global CanvasLineCap, CanvasLineJoin */
// import { Color } from './color'
import { TextStyle } from './label-style'
import { ShapeStyle } from './shape-style'

export class StyleManager {
  private styles: Record<string, ShapeStyle | TextStyle> = {}

  defineShapeStyle (name: string, style: ShapeStyle): void {
    this.styles[name] = style
  }

  defineTextStyle (name: string, style: TextStyle): void {
    this.styles[name] = style
  }

  shapes (name: string) {
    return this.styles[name] as ShapeStyle
  }

  texts (name: string) {
    return this.styles[name] as TextStyle
  }
}

// class ShapeStyleImpl implements ShapeStyle {
//   lineCap?: CanvasLineCap
//   lineDashOffset?: number
//   lineDash?: number[]
//   lineJoin?: CanvasLineJoin
//   lineWidth?: number
//   miterLimit?: number
//   fillStyle?: string | CanvasGradient | CanvasPattern | Color
//   strokeStyle?: string | CanvasGradient | CanvasPattern | Color
//   constructor (style: ShapeStyle) {
//     this.strokeStyle = style.strokeStyle
//   }
// }
