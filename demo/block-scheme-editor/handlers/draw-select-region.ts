import { Rect } from '../../../src/core/rect'
import { Scene } from '../../../src/core/scene'

export default function (s: Scene, rect: Rect) {
  s.actionLayer.createShape({ stroke: '#333' }).rect(rect)
}
