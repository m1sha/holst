import { Importer } from '../../../src/core/data-exchange/importer'
import '../../mock/mockDOMMatrix'
import { createAnchorDTO, createDrawableDTO, createGroupDTO, createLayerDTO, createSceneDTO } from './helpers'

test('import scene. Layers 0', async () => {
  const dto = createSceneDTO()
  const scene = await Importer.import(dto)
  expect(scene.layers.length).toBe(0)
})

test('import scene. anchor', async () => {
  const sceneDto = createSceneDTO()
  const layerDto = createLayerDTO('1', 'Layer 1', 1)
  sceneDto.layers.push(layerDto)
  createDrawableDTO('shape-1', 'Shape 1', 1, undefined, layerDto)
  createDrawableDTO('shape-2', 'Shape 2', 2, 'anchor-1', layerDto)
  createAnchorDTO('anchor-1', 'shape-1', sceneDto)

  const scene = await Importer.import(sceneDto)

  expect(scene.layers[0].drawables.length).toBe(2)
  const anchor = scene.layers[0].drawables[1].anchor
  expect(anchor).toBeDefined()
  expect(anchor!.id).toBe('anchor-1')
  expect(anchor!.container!.id).toBe('shape-1')
})

test('import scene. group', async () => {
  const sceneDto = createSceneDTO()
  const layerDto = createLayerDTO('1', 'Layer 1', 1)
  sceneDto.layers.push(layerDto)

  const groupDto = createGroupDTO('1', 'Group 1')
  layerDto.drawables.push(groupDto)

  createDrawableDTO('shape-1', 'Shape 1', 1, undefined, groupDto)
  createDrawableDTO('shape-2', 'Shape 2', 2, undefined, groupDto)

  const scene = await Importer.import(sceneDto)

  expect(scene.layers[0].groups.length).toBe(1)
  expect(scene.layers[0].groups[0].items[0].id).toBe('shape-1')
})
