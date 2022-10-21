import { Layer } from '../../src/core/layers'
import { StyleManager } from '../../src/core/styles/style-manager'

export function mockShapeFactory () {
  const layer = new Layer(0, new StyleManager())
  return layer.createShape()
}
