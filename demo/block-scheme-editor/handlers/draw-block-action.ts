import { TextStyle } from '../../../src/core/label-style'
import { Layer } from '../../../src/core/layers'
import { Point } from '../../../src/core/point'
import { Rect } from '../../../src/core/rect'
import { Scene } from '../../../src/core/scene'
import { Block } from '../elements/block'

export default function (s: Scene, block: Block) {
  const color = block.hovered ? '#b1b1b1' : '#f5f5f5'
  const layer = s.createLayer()
  const shape = layer.createShape({ fill: color, stroke: '#444' })
  shape.name = block._uid.toString()
  const width = helpers.getTextWidth(block.text, layer)
  const height = 18

  const { x, y } = block.position

  shape.rect(new Rect(x, y, width + 10, height))

  layer.createTextBlock(block.text, helpers.textStyle, new Point(x + 5, y + height - height / 4))
  if (block.selected) {
    helpers.drawSelectionRect(new Rect(x, y, width + 10, height), layer)
  }
}

const helpers = {
  textStyle: { fontName: 'Roboto', fontSize: '18px', color: '#000000' } as TextStyle,
  // shapeStyle: { fillStyle: color },
  drawSelectionRect ({ x, y, width, height }: Rect, layer: Layer): void {
    const margin = 5
    layer.createShape({
      stroke: '#d39303',
      lineDash: [3],
      lineDashOffset: 2,
      lineWidth: 3
    })
      .rect(new Rect(x - margin, y - margin, width + (margin * 2), height + (margin * 2)))
  },
  getTextWidth (text: string, layer: Layer): number {
    return 0 // layer.measureText(text, this.textStyle).width
  }
}
