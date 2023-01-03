import { Rect } from '../../../../../src'
import { IPoint } from '../../../../../src/core/geometry/point'
import { Raster } from '../../../../../src/core/raster'
import { MutableAppState } from '../../app-state'
import { Entity } from '../../entities/entity'
import { Command } from '../command'

export type FrameRect = { p1: IPoint, p2: IPoint }

export class CreateRasterCommand extends Command<FrameRect> {
  constructor (p1: IPoint, p2: IPoint) {
    super()
    this.data = { p1, p2 }
  }

  execute (appState: MutableAppState): void {
    appState.scene().actionLayer.clear()
    const raster = this.createRaster()
    const entity = new Entity(raster)
    appState.addEntities([entity])
    super.execute(appState)
  }

  private createRaster () {
    const rect = Rect.fromTwoPoints(this.data!.p1, this.data!.p2)
    const image = new Image(rect.width, rect.height)
    const r = new Raster(image, new Rect(0, 0, rect.width, rect.height), rect)
    r.name = 'new raster'
    // r.se
    return r
  }
}
