import { Shape } from '../../../../src'
import { EntityReadonly } from '../../model/entities/entity-readonly'
import { Rules } from './property-rules'

export function createShapePropertyRules (viewObject: EntityReadonly<Shape>): Rules {
  return new Rules(viewObject)
    .category('Shape Style')
    .color('Stroke color', 'target.style.stroke', 0)
    .number('Stroke width', 'target.style.lineWidth', 0)
    .color('Fill color', 'target.style.fill', 0)
}
