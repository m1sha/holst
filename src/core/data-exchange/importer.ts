
import { Scene } from '../scene'
import { SceneDTO } from './contract'
import { importShape } from './import/import-shape'
import { importTextBlock } from './import/import-text-block'
import { importGroup } from './import/import-group'
import { Assets } from '../assets'
import { importRaster } from './import/import-raster'

export class Importer {
  async import (data: any): Promise<Scene> {
    const { layers } = data as SceneDTO
    const assets = new Assets()
    const scene = new Scene()
    for (const layerDto of layers) {
      const layer = scene.createLayer()
      for (const drawable of layerDto.drawables) {
        switch (drawable.type) {
          case 'shape':
            layer.add(importShape(drawable))
            break
          case 'text':
            layer.add(importTextBlock(drawable))
            break
          case 'group':
            layer.add(importGroup(drawable))
            break
          case 'raster':
            layer.add(await importRaster(drawable, assets))
        }
      }
    }
    return scene
  }
}
