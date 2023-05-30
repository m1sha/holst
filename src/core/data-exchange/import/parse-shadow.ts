import { Shadow } from '../../styles/shadow'
import { Color } from '../../colors/color'
import { ShadowDTO } from '../contract/shadow'

export function parseShadow (shadow: ShadowDTO) {
  return new Shadow({ x: shadow.x, y: shadow.y }, shadow.blur, new Color(shadow.color))
}
