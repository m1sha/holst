import { Scene } from '../../core/scene'
import { rect } from '../../core/utils'
import { Block } from '../elements/block'

export default function (s: Scene, block: Block) {
  let color = block.selected ? '#411673' : '#991333'
  if (block.hovered) {
    color = '#F18891a'
  }
  const layer = s.createLayer()
  const shape = layer.createShape({ fillStyle: color })
  shape.name = block._uid.toString()

  const textStyle = { fontSize: '16px', color: '#fff' }
  const width = layer.measureText(block.text, textStyle).width

  shape.rect(rect(block.position.x, block.position.y, width + 10, 50))
  layer.createText({ value: block.text, x: w => block.position.x + 5, y: w => block.position.y + 25, style: textStyle })
}
