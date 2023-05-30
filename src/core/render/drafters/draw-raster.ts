import Shape from '../../shape'
import { applyAnchor } from '../../anchor'
import { Raster } from '../../raster'
import { Matrix2D } from '../../matrix'

export function drawRaster (ctx: CanvasRenderingContext2D, raster: Raster, clip: Shape | null, viewportMatrix: Matrix2D) {
  ctx.save()

  if (clip) ctx.clip(clip.toPath2D(viewportMatrix))

  ctx.setTransform(raster.getTransform().mul(viewportMatrix))

  const { x, y } = applyAnchor(raster)
  ctx.drawImage(
    raster.src,
    raster.srcRect.x,
    raster.srcRect.y,
    raster.srcRect.width || 0,
    raster.srcRect.height || 0,
    (raster.distRect?.x || 0) + x,
    (raster.distRect?.y || 0) + y,
    raster.distRect?.width || 0,
    raster.distRect?.height || 0
  )

  ctx.restore()
}
