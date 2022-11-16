import { Color } from '../color'
import { linearGradient } from '../linear-gradient'

export function colorFromGradient (value: number, colors: (Color | string)[]) {
  const r = linearGradient(colors.map(p => {
    if (p instanceof Color) return p.toFloatArray()
    return new Color(p).toFloatArray()
  }), value)
  return new Color(Math.floor(r[0] * 255), Math.floor(r[1] * 255), Math.floor(r[2] * 255), r[3])
}
