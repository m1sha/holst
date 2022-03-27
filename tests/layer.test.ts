import { Layer } from '../src/core/layers'
import { Point } from '../src/core/point'
import { StyleManager } from '../src/core/style-manager'
import { padding } from '../src/core/utils'
import TestContext2D from './test-context2d'

test('Layer ratio should be (1, 1)', () => {
  const layer = new Layer(new TestContext2D(), new StyleManager())
  expect(layer.ratio).toStrictEqual(new Point(1, 1))

  layer.setPadding(padding(10, 10, -10, -10))
  expect(layer.ratio).toStrictEqual(new Point(1, 1))

  // const layer2 = new Layer(new TestContext2D(), 'bottom-left', new StyleManager())
  // expect(layer2.ratio).toStrictEqual(new Point(1, 1))

  // const layer2 = layer2.setPadding(padding(10, 10, -10, -10))
  // expect(layer2.ratio).toStrictEqual(new Point(1, 1))

  const layer3 = new Layer(new TestContext2D(), new StyleManager())
  layer3.setPadding(padding(50, 50, 0, 0))
  expect(layer3.ratio).toStrictEqual(new Point(1, 1))

  // const layer4 = new Layer(new TestContext2D(), 'bottom-left', new StyleManager())
  // layer4.setPadding(padding(50, 50, 0, 0))
  // expect(layer4.ratio).toStrictEqual(new Point(1, 1))
})

test('After padding the width should be 80', () => {
  const layer = new Layer(new TestContext2D(), new StyleManager())
  layer.setPadding(padding(0, 10, 0, 10))
  expect(layer.size.width).toStrictEqual(80)
})

test('Width should be not changed', () => {
  const layer = new Layer(new TestContext2D(), new StyleManager())
  layer.setPadding(padding(0, 10, 0, 0))
  expect(layer.size.width).toStrictEqual(100)
})

// test('Size should be not changed', () => {
//   const layer = new Layer(new TestContext2D(), 'bottom-left', new StyleManager())
//   layer.setPadding(padding(0, 0, 0, 0))
//   expect(layer.size.width).toStrictEqual(100)
//   expect(layer.size.height).toStrictEqual(100)
// })
