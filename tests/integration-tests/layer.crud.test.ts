import '../mock/mockDOMMatrix'
import { fooShape } from './foo/foo-shape'
import { fooLayer } from './foo/foo-layer'
import { fooTextBlock } from './foo/foo-textblock'
import { fooRaster } from './foo/foo-raster'

test('layer crud only shapes', () => {
  const layer = fooLayer()
  expect(layer.entities.length).toBe(0)

  const shape1 = fooShape()
  const shape2 = fooShape()
  const shape3 = fooShape()

  layer.addShape(shape1)
  layer.addShape(shape2)
  layer.addShape(shape3)
  expect(layer.entities.length).toBe(3)

  layer.removeShape(shape3)
  layer.removeShape(shape1)
  layer.removeShape(shape2)
  expect(layer.entities.length).toBe(0)
})

test('scene crud various elements', () => {
  const layer = fooLayer()
  const shape = fooShape()
  const text = fooTextBlock()
  const raster = fooRaster()

  layer.addShape(shape)
  layer.addTextBlock(text)
  layer.addRaster(raster)

  expect(layer.entities.length).toBe(3)
  expect(layer.shapes.length).toBe(1)
  expect(layer.textBlocks.length).toBe(1)

  layer.removeShape(shape)
  expect(layer.entities.length).toBe(2)
  expect(layer.shapes.length).toBe(0)

  layer.removeTextBlock(text)
  expect(layer.entities.length).toBe(1)
  expect(layer.textBlocks.length).toBe(0)

  layer.removeRaster(raster)
  expect(layer.entities.length).toBe(0)
  expect(layer.rasters.length).toBe(0)
})
