import { TextBlock, Point, TextStyle, IPoint, Color } from '../../src/index'
import { Entity } from './model/entities/entity'

export function createDefaultTextBlocks () {
  const textBlock0 = createText('Some Text\n', new Point(10, 100))
  const textBlock1 = createText('Some Text\nSome Text', new Point(120, 100))
  const textBlock2 = createText('Some Text', new Point(250, 100))

  const textBlock3 = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(360, 100))
  textBlock3.size = { width: 100, height: 50 }

  const textBlock4 = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(360, 300))
  textBlock4.size = { width: 100, height: 50 }
  textBlock4.overflow = 'word-break'

  const textBlock = createText('Some Text 123, this is the Text.\nSome new Line. A same Line. Characters\nThis is another line', new Point(250, 300))
  textBlock.size = { width: 100, height: 50 }
  textBlock.overflow = 'word-break + clip'

  return [
    new Entity(textBlock0),
    new Entity(textBlock1),
    new Entity(textBlock2),
    new Entity(textBlock3),
    new Entity(textBlock4),
    new Entity(textBlock)
  ]
}

function createText (str: string, pos: IPoint) {
  const textStyle: TextStyle = { fontSize: '18px', color: Color.darkGrey }
  const textBlock = TextBlock.create(str, textStyle, pos)

  return textBlock
}
