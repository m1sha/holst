import { Scene } from '../../core/scene'
import { rect } from '../../core/utils'
import { Block } from '../elements/block'

export default function (s: Scene, block: Block) {
  const color = block.selected ? '#411673' : '#F11333'
  const shape = s.createLayer().createShape({ fillStyle: color })
  shape.name = block._uid.toString()
  shape.rect(rect(block.position.x, block.position.y, 50, 50))
}
