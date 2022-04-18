import { Sprite } from '../../core/sprite'
import { Assets } from '../../core/assets'

export async function createSpriteDemo (canvas: HTMLCanvasElement) {
  const assets = new Assets()
  assets.add('graveRobber.attack1', '/img/sprites/graveRobber/GraveRobber_attack1.png')
  assets.add('graveRobber.attack2', '/img/sprites/graveRobber/GraveRobber_attack2.png')
  assets.add('graveRobber.death', '/img/sprites/graveRobber/GraveRobber_death.png')
  assets.add('graveRobber.run', '/img/sprites/graveRobber/GraveRobber_run.png')
  await assets.busy
  const bitmap1 = assets.get('graveRobber.attack1')
  const bitmap2 = assets.get('graveRobber.attack2')
  const bitmap3 = assets.get('graveRobber.death')
  const bitmap4 = assets.get('graveRobber.run')

  const sprite = new Sprite(bitmap1, { width: 48, height: 48 })
  const sprite2 = new Sprite(bitmap2, { width: 48, height: 48 })
  const sprite3 = new Sprite(bitmap3, { width: 48, height: 48 })
  const sprite4 = new Sprite(bitmap4, { width: 48, height: 48 })

  const ctx = canvas.getContext('2d')
  let x = 0
  function animate (r: number) {
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#919191'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(sprite.bitmap.src, x, 0, 48, 48, 10, 0, 48, 48)
    ctx.drawImage(sprite2.bitmap.src, x, 0, 48, 48, 10, 50, 48, 48)
    ctx.drawImage(sprite3.bitmap.src, x, 0, 48, 48, 50, 50, 48, 48)
    ctx.drawImage(sprite4.bitmap.src, x, 0, 48, 48, 50, 0, 48, 48)

    if (Math.floor(r) % 8 === 0) x += 48
    if (x > 228) x = 0
    requestAnimationFrame(animate)
  }

  window.requestAnimationFrame(animate)
}
