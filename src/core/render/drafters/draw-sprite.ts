import Shape from '../../shape'
import { applyAnchor } from '../../anchor'
import { Sprite } from '../../sprite'
import { Matrix2D } from '../../matrix'

export function drawSprite (ctx: CanvasRenderingContext2D, sprite: Sprite, clip: Shape | null) {
  ctx.save()

  if (clip) ctx.clip(clip.toPath2D())

  ctx.setTransform(sprite.getTransform().mul(sprite.globalTransform ?? Matrix2D.identity))

  const { x, y } = applyAnchor(sprite)
  ctx.drawImage(
    sprite.raster.src,
    sprite.framePosition.x,
    sprite.framePosition.y,
    sprite.tileSize.width || 0,
    sprite.tileSize.height || 0,
    (sprite.position.x || 0) + x,
    (sprite.position.y || 0) + y,
    sprite.tileSize.width || 0,
    sprite.tileSize.height || 0
  )

  ctx.restore()
}
