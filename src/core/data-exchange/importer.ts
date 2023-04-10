
import { Scene } from '../scene'
import { SceneDTO } from './contract'
import { importShape } from './import/import-shape'
import { importTextBlock } from './import/import-text-block'
import { importGroup } from './import/import-group'
import { Assets } from '../assets'
import { importRaster } from './import/import-raster'
import { ImportOptions } from './import/import-options'

export class Importer {
  static async import (data: any): Promise<Scene> {
    const { layers, anchors } = data as SceneDTO
    const scene = new Scene()

    const options: ImportOptions = {
      anchors: [],
      anchorsDto: anchors,
      drawables: [],
      assets: new Assets()
    }

    for (const layerDto of layers) {
      const layer = scene.createLayer()
      for (const drawable of layerDto.drawables) {
        switch (drawable.type) {
          case 'shape': {
            const shape = importShape(drawable, options)
            layer.add(shape)
            options.drawables.push(shape)
            break
          }
          case 'text': {
            const text = importTextBlock(drawable, options)
            layer.add(text)
            options.drawables.push(text)
            break
          }
          case 'group':
            layer.add(await importGroup(drawable, options))
            break
          case 'raster': {
            const raster = await importRaster(drawable, options)
            layer.add(raster)
            options.drawables.push(raster)
            break
          }
        }
      }
    }
    return scene
  }
}
