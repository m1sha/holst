import { TextBlock, TextBlockLine } from '../../label'
import { TextStyle } from '../../styles/label-style'
import { Matrix2D } from '../../matrix'
import { applyAnchor } from '../../anchor'
import Shape from '../../shape'
import { applyGraphicStyle } from '../../styles/apply-graphic-style'

export function drawTextBlock (ctx: CanvasRenderingContext2D, block: TextBlock, clip: Shape | null) {
  ctx.save()

  if (clip) ctx.clip(clip.toPath2D())

  assignTextStyle(ctx, block.style)
  ctx.setTransform(block.getTransform().mul(block.globalTransform ?? Matrix2D.identity))
  ctx.textBaseline = block.baseline

  const cut = block.overflow === 'clip' || block.overflow === 'word-break + clip'
  if (cut && block.size) {
    const textClipping = new Path2D()
    textClipping.rect(block.target.x, block.target.y, block.size.width, block.size.height)
    ctx.clip(textClipping)
  }

  const position = applyAnchor(block)
  let y = position.y + block.charHeight + getVerticalAlignmentPosition(block)
  const wrap = block.overflow === 'word-break' || block.overflow === 'word-break + clip'
  const lines = wrap ? block.computedLines : block.lines

  for (const line of lines) {
    const x = getAlignmentPosition(position.x, block, line)

    if (block.alignment === 'justify') makeLineJustify(ctx, block, line, x, y)
    else drawText(ctx, block.style, line.text, x, y)

    y += block.charHeight + block.lineHeight
  }

  ctx.restore()
}

function getAlignmentPosition (dx: number, { alignment, width, size }: TextBlock, line: TextBlockLine) {
  const x = dx
  const realWidth = size ? size.width : width
  switch (alignment) {
    case 'left': return x
    case 'center': return x + realWidth / 2 - line.getWidth() / 2
    case 'right': return x + realWidth - line.getWidth()
    case 'justify': return x
  }
}

function getVerticalAlignmentPosition (block: TextBlock) {
  const size = block.computedSize
  if (block.verticalAlignment === 'top') return 0
  if (block.verticalAlignment === 'bottom') return size.height - block.height
  if (block.verticalAlignment === 'center') return (size.height / 2) - (block.height / 2)
  return 0
}

function makeLineJustify (ctx: CanvasRenderingContext2D, { style, computedSize }: TextBlock, line: TextBlockLine, x: number, y: number) {
  const realWidth = computedSize.width
  if (realWidth === line.getWidth()) {
    drawText(ctx, style, line.text, x, y)
    return
  }

  const textBlock = new TextBlock(line.text.replaceAll(' ', '\n'), style)
  const fullTextLen = textBlock.lines.reduce((a, b) => a + b.getWidth(), 0)
  const dx = (realWidth - fullTextLen) / textBlock.lines.length
  let sx = x
  for (const l of textBlock.lines) {
    ctx.fillText(l.text, sx, y)
    sx += l.getWidth() + dx + dx / (textBlock.lines.length - 1)
  }
}

function assignTextStyle (ctx: CanvasRenderingContext2D, style: TextStyle) {
  style = style || {}
  ctx.fillStyle = style.color ? applyGraphicStyle(style.color, ctx) : '#000'
  ctx.strokeStyle = style.outlineColor ? applyGraphicStyle(style.outlineColor, ctx) : ''
  if (style.outlineWidth) ctx.lineWidth = style.outlineWidth
  const fontName = style.fontName || 'serif'
  const fontSize = style.fontSize || '10pt'
  const bold = typeof style.bold === 'boolean' && style.bold ? 'bold ' : style.bold ? style.bold : 'normal'
  const italic = style.italic ? 'italic ' : 'normal'
  const fontVariant = style.fontVariant ?? 'normal'
  ctx.font = `${italic} ${bold} ${fontVariant} ${fontSize} ${fontName}`
}

function drawText (ctx: CanvasRenderingContext2D, style: TextStyle, text: string, x: number, y: number) {
  if (style.fillStrokeOrder === 'stroke-first') {
    strokeText(ctx, style, text, x, y)
    fillText(ctx, style, text, x, y)
  }

  if (!style.fillStrokeOrder || style.fillStrokeOrder === 'fill-first') {
    fillText(ctx, style, text, x, y)
    strokeText(ctx, style, text, x, y)
  }
}

function fillText (ctx: CanvasRenderingContext2D, style: TextStyle, text: string, x: number, y: number) {
  if (style.color !== 'transparent') ctx.fillText(text, x, y)
}

function strokeText (ctx: CanvasRenderingContext2D, style: TextStyle, text: string, x: number, y: number) {
  if (style.outlineColor && style.outlineColor !== 'transparent') ctx.strokeText(text, x, y)
}
