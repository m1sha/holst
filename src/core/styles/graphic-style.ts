import { Gradient } from '../gradients/gradient'
import { Color } from '../color'

export type GraphicStyle = string | Color | CanvasGradient | CanvasPattern | Gradient
export type NativeGraphicStyle = string | CanvasGradient | CanvasPattern
