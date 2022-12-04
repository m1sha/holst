import { TextBlock } from '../../../../src/index'
import { ViewObject } from '../../model/view-object'
import { Rules } from './property-rules'

const Bold = ['normal', 'bold', 'lighter', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const FontVariant = ['normal', 'small-caps']
const Overflow = ['none', 'word-break', 'clip', 'word-break + clip']
const Alignment = ['left', 'center', 'right', 'justify']
const VerticalAlignment = ['top', 'center', 'bottom']
const Baseline = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom']
const FontNames = ['Arial', 'Courier New', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif', 'serif']

export function createTextBlockPropertyRules (viewObject: ViewObject): Rules {
  const textBlock = viewObject.object as TextBlock
  const isTransparent = (viewObject: ViewObject) =>
    !(viewObject.object as TextBlock).style.outlineColor || textBlock.style.outlineColor === 'transparent'

  return new Rules(viewObject)
    .category('Text Style')
    .color('Color', 'object.style.color', 0)
    .string('Size', 'object.style.fontSize', 0)
    .select('Font', 'object.style.fontName', FontNames, 0)
    .select('Bold', 'object.style.bold', Bold, 0)
    .bool('Italic', 'object.style.italic', 0)
    .select('Variant', 'object.style.fontVariant', FontVariant, 0)
    .custom('Outline', 'checkbox', () => !isTransparent(viewObject),
      (rules, value) => {
        textBlock.style.outlineColor = value ? '#000' : undefined
        rules.getRule('Outline Color')!.hidden = !value
        rules.getRule('Outline Width')!.hidden = !value
      },
      0,
      false
    )
    .color('Outline Color', 'object.style.outlineColor', 0, isTransparent(viewObject))
    .number('Outline Width', 'object.style.outlineWidth', 0, isTransparent(viewObject))
    .category('Text Transform')
    .number('x', 'object.target.x', 1)
    .number('y', 'object.target.y', 1)
    .custom('Fixed Size', 'checkbox', 'object.size',
      (rules, value) => {
        textBlock.size = value ? textBlock.computedSize : undefined
        rules.getRule('Width')!.hidden = !value
        rules.getRule('Height')!.hidden = !value
      },
      1,
      false
    )
    .number('Width', 'object.size.width', 1, !textBlock.size)
    .number('Height', 'object.size.height', 1, !textBlock.size)
    .select('Overflow', 'object.overflow', Overflow, 1)
    .number('Line Height', 'object.lineHeight', 1)
    .select('Alignment', 'object.alignment', Alignment, 1)
    .select('Vertical Alignment', 'object.verticalAlignment', VerticalAlignment, 1)
    .select('Baseline', 'object.baseline', Baseline, 1)
}
