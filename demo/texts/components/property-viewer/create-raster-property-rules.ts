
import { Raster } from '../../../../src/core/raster'
import { EntityReadonly } from '../../model/entities/entity-readonly'
import { Rules } from './property-rules'

export function createRasterPropertyRules (viewObject: EntityReadonly<Raster>): Rules {
  return new Rules(viewObject)
    .category('Source rect')
    .number('X', 'target.srcRect.x', 0)
    .number('Y', 'target.srcRect.y', 0)
    .number('Width', 'target.srcRect.width', 0)
    .number('Height', 'target.srcRect.height', 0)
    .category('Distribute rect')
    .number('X', 'target.distRect.x', 1)
    .number('Y', 'target.distRect.y', 1)
    .number('Width', 'target.distRect.width', 1)
    .number('Height', 'target.distRect.height', 1)
}
