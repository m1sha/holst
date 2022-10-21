import { Gradient } from '../gradients/gradient'
import { Color } from '../colors/color'
import { Pattern } from '../pattern'

export type GraphicStyle = string | Color | CanvasGradient | CanvasPattern | Gradient | Pattern
export type NativeGraphicStyle = string | CanvasGradient | CanvasPattern
