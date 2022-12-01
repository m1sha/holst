import { TextBlock } from '../../src/index'
import { Rules } from '../utils/property-viewer/prorerty-rules'

const Bold = ['normal', 'bold', 'lighter', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900']
const FontVariant = ['normal', 'small-caps']
const Overflow = ['none', 'word-break', 'clip', 'word-break + clip']
const Alignment = ['left', 'center', 'right', 'justify']
const VerticalAlignment = ['top', 'center', 'bottom']
const Baseline = ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom']

export function createTextBlockPropertyRules (textBlock: TextBlock): Rules {
  return new Rules(textBlock)
    .category('Text Style')
    .color('Color', 'style.color', 0)
    .string('Size', 'style.fontSize', 0)
    .string('Font Name', 'style.fontName', 0)
    .select('Bold', 'style.bold', Bold, 0)
    .bool('Italic', 'style.italic', 0)
    .select('Font Variant', 'style.fontVariant', FontVariant, 0)
    .custom('Outline', 'checkbox', () => textBlock.style.outlineColor && textBlock.style.outlineColor !== 'transparent',
      (rules, value) => {
        textBlock.style.outlineColor = value ? '#000' : undefined
        rules.getRule('Outline Color')!.hidden = !value
        rules.getRule('Outline Width')!.hidden = !value
      },
      0,
      false
    )
    .color('Outline Color', 'style.outlineColor', 0, !textBlock.style.outlineColor || textBlock.style.outlineColor !== 'transparent')
    .number('Outline Width', 'style.outlineWidth', 0, !textBlock.style.outlineColor || textBlock.style.outlineColor !== 'transparent')
    .category('Text Transform')
    .number('x', 'target.x', 1)
    .number('y', 'target.y', 1)
    .number('Line Height', 'lineHeight', 1)
    .select('Overflow', 'overflow', Overflow, 1)
    .select('Alignment', 'alignment', Alignment, 1)
    .select('Vertical Alignment: ', 'verticalAlignment', VerticalAlignment, 1)
    .select('Baseline', 'baseline', Baseline, 1)
    .custom('Fixed Size', 'checkbox', 'size',
      (rules, value) => {
        textBlock.size = value ? { width: 0, height: 0 } : undefined
        rules.getRule('Width')!.hidden = !value
        rules.getRule('Height')!.hidden = !value
      },
      1,
      false
    )
    .number('Width', 'size.width', 1, !textBlock.size)
    .number('Height', 'size.height', 1, !textBlock.size)
}
