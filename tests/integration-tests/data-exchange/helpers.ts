import { GroupDTO } from '../../../src/core/data-exchange/contract/group'
import { LayerDTO, SceneDTO } from '../../../src/core/data-exchange/contract'
import { DrawableDTO } from '../../../src/core/data-exchange/contract/drawable'

export function createSceneDTO (): SceneDTO {
  return {
    version: '1.0.0',
    layers: [],
    anchors: []
  }
}

export function createLayerDTO (id: string, name: string, order: number): LayerDTO {
  return {
    id,
    name,
    order,
    drawables: []
  }
}

export function createDrawableDTO (id: string, name: string, order: number, anchor: string | undefined, layer: LayerDTO | GroupDTO): void {
  const result: DrawableDTO = {
    type: 'shape',
    id: id,
    name: name,
    order: order,
    style: { fill: '#333' },
    figures: [
      { type: 'circle', x: 10, y: 10, radius: 20 }
    ],
    anchor: anchor
  }
  if (Object.hasOwn(layer, 'drawables')) (layer as LayerDTO).drawables.push(result)
  if (Object.hasOwn(layer, 'items')) (layer as GroupDTO).items.push(result)
}

export function createAnchorDTO (id: string, containerId: string, scene: SceneDTO): void {
  scene.anchors.push({ id, containerId })
}

export function createGroupDTO (id: string, name: string): GroupDTO {
  return {
    type: 'group',
    id,
    name,
    items: []
  }
}
