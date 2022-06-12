import { TextBlock } from '../label'
import { Color } from '../color'
import { TextStyle } from '../label-style'

export function drawTextBlock (ctx: CanvasRenderingContext2D, block: TextBlock) {
  assignTextStyle(ctx, block.style)
  if (!block.multiline) {
    ctx.fillText(block.text, block.target.x, block.target.y)
  } else {
    let y = block.target.y + block.charHeight
    for (const line of block.lines) {
      let x = block.target.x
      if (block.alignment === 'center') {
        x += block.width / 2 - block.getWidth(line) / 2
      }
      ctx.fillText(line, x, y)
      y += block.charHeight + block.lineHeight
    }
  }
}

function assignTextStyle (ctx: CanvasRenderingContext2D, style: TextStyle) {
  style = style || {}
  ctx.fillStyle = style.color instanceof Color ? style.color.toString() : style.color || '#000'
  const fontName = style.fontName || 'serif'
  const fontSize = style.fontSize || '10pt'
  const bold = style.bold ? 'bold ' : ''
  const italic = style.italic ? 'italic ' : ''
  ctx.font = `${italic}${bold}${fontSize} ${fontName}`
}
