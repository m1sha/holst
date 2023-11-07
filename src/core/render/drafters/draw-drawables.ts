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
import { Rect } from '../../geometry/rect'

export function drawDrawables (
  ctx: CanvasRenderingContext2D,
  list: Readonly<Drawable[]>,
  mask: Shape | null,
  viewportMatrix: Matrix2D,
  viewportRect: Rect,
  forceRedraw: boolean,
  disableShapeCache: boolean,
  dpr: number,
  callback: (item: Drawable) => void
) {
  for (const item of list) {
    if (item.hidden) continue
    // if (!item.frozen && !rectOverlapViewport(viewportRect, item.bounds, viewportMatrix)) {
    //   continue
    // }

    if (item instanceof Shape || item instanceof Sketch) drawShape(ctx, item, mask, viewportMatrix, forceRedraw, disableShapeCache, dpr)
    if (item instanceof TextBlock) drawTextBlock(ctx, item, mask, viewportMatrix, dpr)
    if (item instanceof Raster) drawRaster(ctx, item, mask, viewportMatrix, dpr)
    if (item instanceof Sprite) drawSprite(ctx, item, mask, viewportMatrix, dpr)
    if (item instanceof Group) drawDrawables(ctx, item.items, mask, viewportMatrix, viewportRect, forceRedraw, disableShapeCache, dpr, callback)
    callback(item)
  }
}

// function rectOverlapViewport (
//   { x, y, absWidth, absHeight }: Rect,
//   { topLeft, bottomRight }: Rect,
//   matrix: Matrix2D
// ): boolean {
//   const { x: left, y: top } = matrix.applyMatrix(topLeft)
//   const { x: right, y: bottom } = matrix.applyMatrix(bottomRight)

//   return (
//     (left >= x && left <= absWidth && top >= y && top <= absHeight) ||
//     (right >= x && right <= absWidth && bottom >= y && bottom <= absHeight)
//   )
// }
