import { Rect } from '../../../core/rect'
import { Scene } from '../../../core/scene'

export default function (s: Scene, rect: Rect) {
  s.actionLayer.createShape({ strokeStyle: '#333' }).rect(rect)
}
