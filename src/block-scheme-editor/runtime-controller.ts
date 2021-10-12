import { Environment } from './environment'

export class RuntimeController {
  private environment: Environment
  constructor (environment: Environment) {
    this.environment = environment
  }

  start () {
    const scene = this.environment.scene
    scene.addEventListener('mousemove', e => {
      const point = e.point
      if (!point) return
      const layers = scene.allLayers
      for (const layer of layers) {
        for (const shape of layer.allShapes) {
          const block = this.environment.blocks.filter(p => p._uid === parseInt(shape.name))[0]
          if (!block) continue
          const yes = scene.ctx.ctx.isPointInPath(shape.getPath(), point.x, point.y)
          if (!yes) {
            block.selected = false
            document.body.style.cursor = 'default'
            continue
          }
          block.selected = true
          document.body.style.cursor = 'pointer'
          break
        }
      }
      this.environment.update()
    })
  }
}
