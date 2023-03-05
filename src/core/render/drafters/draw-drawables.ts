import { Sketch } from '../../sketch'
import { Drawable } from '../../drawable'
import Shape from '../../shape'
import { drawShape } from './draw-shape'
import { TextBlock } from '../../label'
import { Raster } from '../../raster'
import { Sprite } from '../../sprite'
import { drawTextBlock } from './draw-text-block'
import { drawRaster } from './draw-raster'
import { drawSprite } from './draw-sprite'
import { Group } from '../../group'
import { Matrix2D } from '../../matrix'

export function drawDrawables (ctx: CanvasRenderingContext2D, list: Readonly<Drawable[]>, mask: Shape | null, viewportMatrix: Matrix2D, callback: (item: Drawable) => void) {
  for (const item of list) {
    if (item.hidden) continue
    if (item instanceof Shape || item instanceof Sketch) drawShape(ctx, item, mask, viewportMatrix)
    if (item instanceof TextBlock) drawTextBlock(ctx, item, mask, viewportMatrix)
    if (item instanceof Raster) drawRaster(ctx, item, mask, viewportMatrix)
    if (item instanceof Sprite) drawSprite(ctx, item, mask, viewportMatrix)
    if (item instanceof Group) drawDrawables(ctx, item.items, mask, viewportMatrix, callback)
    callback(item)
  }
}
