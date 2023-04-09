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

export class Exporter {
  export (scene: Scene): SceneDTO {
    const result: SceneDTO = {
      version: '1.0.0',
      layers: []
    }

    for (const layer of scene.layers) {
      const layerDto: LayerDTO = { id: layer.id, drawables: [] }
      for (const drawable of layer.drawables) {
        switch (drawable.type) {
          case 'shape':
            layerDto.drawables.push(exportShape(drawable as Shape))
            break
          case 'text':
            layerDto.drawables.push(exportTextBlock(drawable as TextBlock))
            break
          case 'raster':
            layerDto.drawables.push(exportRaster(drawable as Raster))
            break
          case 'group':
            layerDto.drawables.push(exportGroup(drawable as Group))
            break
        }
      }
      result.layers.push(layerDto)
    }

    return result
  }
}
