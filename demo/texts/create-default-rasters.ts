import { Assets } from '../../src'
import { Entity } from './model/entities/entity'

export async function createDefaultRasters () {
  const assets = new Assets()
  assets.add('image', 'img/sky.png')
  await assets.busy
  const raster = assets.get('image')
  raster.order = 2
  return [
    new Entity(raster)
  ]
}
