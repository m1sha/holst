import { StyleManager } from '../../../src/core/style-manager'
import { Layer } from '../../../src/core/layers'

export function fooLayer () {
  return new Layer(0, new StyleManager())
}
