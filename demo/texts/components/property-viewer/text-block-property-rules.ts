import { TextBlock } from '../../../../src/index'
import { EntityReadonly } from '../../model/entities/entity-readonly'
import { Rules } from './property-rules'

const Bold = ['normal', 'bold', 'lighter', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const FontVariant = ['normal', 'small-caps']
const Overflow = ['none', 'word-break', 'clip', 'word-break + clip']
const Alignment = ['left', 'center', 'right', 'justify']
const VerticalAlignment = ['top', 'center', 'bottom']
const Baseline = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom']
const FontNames = ['Arial', 'Courier New', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif', 'serif']

export function createTextBlockPropertyRules (viewObject: EntityReadonly<TextBlock>): Rules {
  const textBlock = viewObject.target
  const isTransparent = (viewObject: EntityReadonly<TextBlock>) =>
    !viewObject.target.style.outlineColor || textBlock.style.outlineColor === 'transparent'

  return new Rules(viewObject)
    .category('Text Style')
    .color('Color', 'target.style.color', 0)
    .string('Size', 'target.style.fontSize', 0)
    .select('Font', 'target.style.fontName', FontNames, 0)
    .select('Bold', 'target.style.bold', Bold, 0)
    .bool('Italic', 'target.style.italic', 0)
    .select('Variant', 'target.style.fontVariant', FontVariant, 0)
    .custom('Outline', 'checkbox', () => !isTransparent(viewObject),
      (rules, value) => {
        textBlock.style.outlineColor = value ? '#000' : undefined
        rules.getRule('Outline Color')!.hidden = !value
        rules.getRule('Outline Width')!.hidden = !value
      },
      0,
      false
    )
    .color('Outline Color', 'target.style.outlineColor', 0, isTransparent(viewObject))
    .number('Outline Width', 'target.style.outlineWidth', 0, isTransparent(viewObject))
    .category('Text Transform')
    .number('x', 'target.target.x', 1)
    .number('y', 'target.target.y', 1)
    .custom('Fixed Size', 'checkbox', 'target.size',
      (rules, value) => {
        textBlock.size = value ? textBlock.computedSize : undefined
        rules.getRule('Width')!.hidden = !value
        rules.getRule('Height')!.hidden = !value
      },
      1,
      false
    )
    .number('Width', 'target.size.width', 1, !textBlock.size)
    .number('Height', 'target.size.height', 1, !textBlock.size)
    .select('Overflow', 'target.overflow', Overflow, 1)
    .number('Line Height', 'target.lineHeight', 1)
    .select('Alignment', 'target.alignment', Alignment, 1)
    .select('Vertical Alignment', 'target.verticalAlignment', VerticalAlignment, 1)
    .select('Baseline', 'target.baseline', Baseline, 1)
}
