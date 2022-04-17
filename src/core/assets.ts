import { Bitmap } from './bitmap'
import { ResourceLoader, ResourceLoaderCallBackFactory } from '../tools/resource-loader'

export class Assets extends ResourceLoader<Bitmap> {
  factory (): ResourceLoaderCallBackFactory<Bitmap> {
    return (url, callback, error) => Bitmap.createImage(url, callback, error)
  }
}
