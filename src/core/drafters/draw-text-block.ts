import { TextBlock, TextBlockLine } from '../label'
import { Color } from '../color'
import { TextStyle } from '../label-style'

export function drawTextBlock (ctx: CanvasRenderingContext2D, block: TextBlock) {
  assignTextStyle(ctx, block.style)
  ctx.setTransform(block.transform)
  ctx.textBaseline = block.baseline
  const cut = block.overflow === 'clip' || block.overflow === 'word-break + clip'
  if (cut && block.size) {
    ctx.rect(block.target.x, block.target.y, block.size.width, block.size.height)
    ctx.clip()
  }
  if (!block.multiline && !block.size) {
    ctx.fillText(block.text, block.target.x, block.target.y)
  } else {
    let y = block.target.y + block.charHeight
    const wrap = block.overflow === 'word-break' || block.overflow === 'word-break + clip'
    const lines = wrap ? block.wrappedLines : block.lines
    for (const line of lines) {
      const x = getAlignmentPosition(block, line)
      if (block.alignment === 'justify') makeLineJustify(ctx, block, line, x, y)
      else ctx.fillText(line.text, x, y)
      y += block.charHeight + block.lineHeight
    }
  }
}

function getAlignmentPosition ({ target, alignment, width }: TextBlock, line: TextBlockLine) {
  const x = target.x
  switch (alignment) {
    case 'left': return x
    case 'center': return x + width / 2 - line.getWidth() / 2
    case 'right': return x + width - line.getWidth()
    case 'justify': return x
  }
}

function makeLineJustify (ctx: CanvasRenderingContext2D, { width, style }: TextBlock, line: TextBlockLine, x: number, y: number) {
  if (width === line.getWidth()) {
    ctx.fillText(line.text, x, y)
    return
  }

  const textBlock = new TextBlock(line.text.replaceAll(' ', '\n'), style)
  const fullTextLen = textBlock.lines.reduce((a, b) => a + b.getWidth(), 0)
  const dx = (width - fullTextLen) / textBlock.lines.length
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
  ctx.font = `${italic} ${bold} ${fontSize} ${fontName}`
}
