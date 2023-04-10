import Shape from '../shape'
import { Scene } from '../scene'
import { LayerDTO, SceneDTO } from './contract'
import { exportShape } from './export/export-shape'
import { TextBlock } from '../label'
import { exportTextBlock } from './export/export-text-block'
import { Group } from '../group'
import { exportGroup } from './export/export-group'
import { exportRaster } from './export/export-raster'
import { Raster } from '../raster'
import { AnchorDTO } from './contract/anchor'

export class Exporter {
  static export (scene: Scene): SceneDTO {
    const anchors: AnchorDTO[] = []
    const result: SceneDTO = {
      version: '1.0.0',
      layers: [],
      anchors
    }

    for (const layer of scene.layers) {
      const layerDto: LayerDTO = { id: layer.id, name: layer.name, order: layer.order, drawables: [] }
      for (const drawable of layer.drawables) {
        switch (drawable.type) {
          case 'shape':
            layerDto.drawables.push(exportShape(drawable as Shape, anchors))
            break
          case 'text':
            layerDto.drawables.push(exportTextBlock(drawable as TextBlock, anchors))
            break
          case 'raster':
            layerDto.drawables.push(exportRaster(drawable as Raster, anchors))
            break
          case 'group':
            layerDto.drawables.push(exportGroup(drawable as Group, anchors))
            break
        }
      }
      result.layers.push(layerDto)
    }

    return result
  }
}
