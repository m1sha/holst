import { Shadow } from '../../styles/shadow'
import { ShadowDTO } from '../contract/shadow'

export function exportShadow (shadow: Shadow): ShadowDTO {
  const point = shadow.point ?? { x: 0, y: 0 }
  return {
    x: point.x,
    y: point.y,
    blur: shadow.blur || 0,
    color: shadow.color ? (typeof shadow.color === 'string' ? shadow.color : shadow.color.toString()) : '#000'
  }
}
