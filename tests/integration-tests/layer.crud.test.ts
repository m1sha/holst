import '../mock/mockDOMMatrix'
import { fooShape } from './foo/foo-shape'
import { fooLayer } from './foo/foo-layer'
import { fooTextBlock } from './foo/foo-textblock'
import { fooRaster } from './foo/foo-raster'

test('layer crud only shapes', () => {
  const layer = fooLayer()
  expect(layer.drawables.length).toBe(0)

  const shape1 = fooShape()
  const shape2 = fooShape()
  const shape3 = fooShape()

  layer.addShape(shape1)
  layer.addShape(shape2)
  layer.addShape(shape3)
  expect(layer.drawables.length).toBe(3)

  layer.remove(shape3)
  layer.remove(shape1)
  layer.remove(shape2)
  expect(layer.drawables.length).toBe(0)
})

test('scene crud various elements', () => {
  const layer = fooLayer()
  const shape = fooShape()
  const text = fooTextBlock()
  const raster = fooRaster()

  layer.addShape(shape)
  layer.addTextBlock(text)
  layer.addRaster(raster)

  expect(layer.drawables.length).toBe(3)
  expect(layer.shapes.length).toBe(1)
  expect(layer.textBlocks.length).toBe(1)

  layer.remove(shape)
  expect(layer.drawables.length).toBe(2)
  expect(layer.shapes.length).toBe(0)

  layer.remove(text)
  expect(layer.drawables.length).toBe(1)
  expect(layer.textBlocks.length).toBe(0)

  layer.remove(raster)
  expect(layer.drawables.length).toBe(0)
  expect(layer.rasters.length).toBe(0)
})
