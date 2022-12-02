import { Shape2 } from '../../src/core/shape2'
import { TextBlock, Point, TextStyle, IPoint, Layer, Color } from '../../src/index'

export function createDefaultTextBlocks (layer: Layer) {
  const textBlock0 = createText('Some Text\n', new Point(10, 100), layer)
  const textBlock1 = createText('Some Text\nSome Text', new Point(120, 100), layer)
  const textBlock2 = createText('Some Text', new Point(250, 100), layer)

  const textBlock3 = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(360, 100), layer, textBlock => {
    textBlock.size = { width: 100, height: 50 }
  })

  const textBlock4 = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(360, 300), layer, textBlock => {
    textBlock.size = { width: 100, height: 50 }
    textBlock.overflow = 'word-break'
  })

  const textBlock = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(250, 300), layer, textBlock => {
    textBlock.size = { width: 100, height: 50 }
    textBlock.overflow = 'word-break + clip'
  })

  return [textBlock0, textBlock1, textBlock2, textBlock3, textBlock4, textBlock]
}

function createText (str: string, pos: IPoint, layer: Layer, callback?: (textBlock: TextBlock) => void) {
  const textStyle: TextStyle = { fontSize: '18px', color: Color.darkGrey }
  const textBlock = TextBlock.create(str, textStyle, pos)
  if (callback) callback(textBlock)
  layer.add(textBlock)
  const bounds = textBlock.bounds
  layer.add(Shape2.create({ stroke: Color.orange }).rect(bounds))
  return textBlock
}
