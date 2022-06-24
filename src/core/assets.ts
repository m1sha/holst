import { Raster } from './raster'
import { ResourceLoader, ResourceLoaderCallBackFactory } from '../tools/resource-loader'

export class Assets extends ResourceLoader<Raster> {
  factory (): ResourceLoaderCallBackFactory<Raster> {
    return (url, callback, error) => Raster.createImage(url, callback, error)
  }
}
