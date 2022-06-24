import { Sprite } from '../../core/sprite'
import { Assets } from '../../core/assets'
import { Scene, Renderer2D } from 'index'

export async function createSpriteDemo (canvas: HTMLCanvasElement) {
  const assets = new Assets()
  assets.add('graveRobber.attack1', '/img/sprites/graveRobber/GraveRobber_attack1.png')
  assets.add('graveRobber.attack2', '/img/sprites/graveRobber/GraveRobber_attack2.png')
  assets.add('graveRobber.death', '/img/sprites/graveRobber/GraveRobber_death.png')
  assets.add('graveRobber.run', '/img/sprites/graveRobber/GraveRobber_run.png')
  await assets.busy
  const raster1 = assets.get('graveRobber.attack1')
  const raster2 = assets.get('graveRobber.attack2')
  const raster3 = assets.get('graveRobber.death')
  const raster4 = assets.get('graveRobber.run')

  const sprite = new Sprite(raster1, { width: 48, height: 48 })
  sprite.position = { x: 10, y: 10 }
  const sprite2 = new Sprite(raster2, { width: 48, height: 48 })
  sprite2.position = { x: 10, y: 60 }
  const sprite3 = new Sprite(raster3, { width: 48, height: 48 })
  sprite3.position = { x: 60, y: 10 }
  const sprite4 = new Sprite(raster4, { width: 48, height: 48 })
  sprite4.position = { x: 60, y: 60 }

  const scene = new Scene()
  const layer = scene.createLayer()
  layer.addSprite(sprite)
  layer.addSprite(sprite2)
  layer.addSprite(sprite3)
  layer.addSprite(sprite4)
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)

  let x = 0
  renderer.onFrameChanged = () => {
    if (x === 0) {
      sprite.next()
      sprite2.next()
      sprite3.next()
      sprite4.next()
    }

    x += 0.2
    if (x > 1) x = 0
  }
}
