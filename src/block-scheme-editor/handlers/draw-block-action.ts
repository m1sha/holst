import { TextStyle } from '../../core/label-style'
import { Layer } from '../../core/layers'
import { Rect } from '../../core/rect'
import { Scene } from '../../core/scene'
import { point, rect } from '../../core/utils'
import { Block } from '../elements/block'

export default function (s: Scene, block: Block) {
  const color = block.hovered ? '#b1b1b1' : '#f5f5f5'
  const layer = s.createLayer()
  const shape = layer.createShape({ fillStyle: color, strokeStyle: '#444' })
  shape.name = block._uid.toString()
  const width = helpers.getTextWidth(block.text, layer)
  const height = 18

  const { x, y } = block.position

  shape.rect(rect(x, y, width + 10, height))

  layer.createTextBlock(block.text, helpers.textStyle, point(x + 5, y + height - height / 4))
  if (block.selected) {
    helpers.drawSelectionRect(rect(x, y, width + 10, height), layer)
  }
}

const helpers = {
  textStyle: { fontName: 'Roboto', fontSize: '18px', color: '#000000' } as TextStyle,
  // shapeStyle: { fillStyle: color },
  drawSelectionRect ({ x, y, width, height }: Rect, layer: Layer): void {
    const margin = 5
    layer.createShape({
      strokeStyle: '#d39303',
      lineDash: [3],
      lineDashOffset: 2,
      lineWidth: 3
    })
      .rect(rect(x - margin, y - margin, width + (margin * 2), height + (margin * 2)))
  },
  getTextWidth (text: string, layer: Layer): number {
    return layer.measureText(text, this.textStyle).width
  }
}
