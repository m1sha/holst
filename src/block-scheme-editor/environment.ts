import { Point } from '../core/point'
import { Scene } from '../core/scene'
import { Block } from './elements/block'
import drawBlock from './handlers/draw-block-action'
export class Environment {
  scene: Scene
  blocks: Block[] = []

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas)
  }

  addBlock (block: Block) {
    const index = this.blocks.findIndex(p => p._uid === block._uid)
    if (index > -1) this.blocks.splice(index, 1)
    this.blocks.push(block)
  }

  clearHover () {
    this.blocks.forEach(p => (p.hovered = false))
  }

  findHoverBlock (point: Point): Block {
    const layers = this.scene.allLayers
    for (const layer of layers) {
      for (const shape of layer.allShapes) {
        const block = this.blocks.filter(p => p._uid === parseInt(shape.name))[0]
        if (!block) continue
        const yes = this.scene.ctx.ctx.isPointInPath(shape.getPath(), point.x, point.y)
        if (!yes) continue
        return block
      }
    }
    return null
  }

  update () {
    this.scene.clearAll()
    for (const block of this.blocks) {
      drawBlock(this.scene, block)
    }
    this.scene.render()
  }
}
