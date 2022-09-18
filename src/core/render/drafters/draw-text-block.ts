import { TextBlock, TextBlockLine } from '../../label'
import { Color } from '../../color'
import { TextStyle } from '../../label-style'
import { Matrix2D } from '../../matrix'
import { applyAnchor } from '../../anchor'
import Shape from '../../shape'

export function drawTextBlock (ctx: CanvasRenderingContext2D, block: TextBlock, clip: Shape | null) {
  ctx.save()

  if (clip) ctx.clip(clip.toPath2D())

  assignTextStyle(ctx, block.style)
  ctx.setTransform(block.transform.mul(block.globalTransform ?? Matrix2D.identity))
  ctx.textBaseline = block.baseline
  const cut = block.overflow === 'clip' || block.overflow === 'word-break + clip'
  if (cut && block.size) {
    ctx.rect(block.target.x, block.target.y, block.size.width, block.size.height)
    ctx.clip()
  }
  if (!block.multiline && !block.size) {
    const { x, y } = applyAnchor(block)
    ctx.fillText(block.text, x, y)
  } else {
    const p = applyAnchor(block)
    let y = p.y + block.charHeight + getVerticalAlignmentPosition(block)
    const wrap = block.overflow === 'word-break' || block.overflow === 'word-break + clip'
    const lines = wrap ? block.wrappedLines : block.lines
    for (const line of lines) {
      const x = getAlignmentPosition(p.x, block, line)
      if (block.alignment === 'justify') makeLineJustify(ctx, block, line, x, y)
      else ctx.fillText(line.text, x, y)
      y += block.charHeight + block.lineHeight
    }
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
  if (!block.size) return 0
  if (block.verticalAlignment === 'top') return 0
  if (block.verticalAlignment === 'bottom') return block.size.height - block.height
  if (block.verticalAlignment === 'center') return (block.size.height / 2) - (block.height / 2)
  return 0
}

function makeLineJustify (ctx: CanvasRenderingContext2D, { width, style, size }: TextBlock, line: TextBlockLine, x: number, y: number) {
  const realWidth = size ? size.width : width
  if (realWidth === line.getWidth()) {
    ctx.fillText(line.text, x, y)
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
  ctx.fillStyle = style.color instanceof Color ? style.color.toString() : style.color || '#000'
  const fontName = style.fontName || 'serif'
  const fontSize = style.fontSize || '10pt'
  const bold = typeof style.bold === 'boolean' && style.bold ? 'bold ' : style.bold ? style.bold : 'normal'
  const italic = style.italic ? 'italic ' : 'normal'
  const fontVariant = style.fontVariant ?? 'normal'
  ctx.font = `${italic} ${bold} ${fontVariant} ${fontSize} ${fontName}`
}
