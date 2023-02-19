import { Raster } from '../../raster'
import { Filter } from './filter'

export class UseFilters {
  private raster: Raster
  private filters: Filter[] = []
  constructor (raster: Raster) {
    this.raster = raster
  }

  add (filter: Filter): UseFilters {
    this.filters.push(filter)
    return this
  }

  apply () {
    const imageData = this.raster.getData()
    for (const filter of this.filters) {
      filter.apply(imageData)
    }
    this.raster.setData(imageData)
  }
}
