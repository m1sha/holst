import { Gradient } from '../gradients/gradient'
import { Color } from '../color'
import { Pattern } from '../pattern'

export type GraphicStyle = string | Color | CanvasGradient | CanvasPattern | Gradient | Pattern
export type NativeGraphicStyle = string | CanvasGradient | CanvasPattern
