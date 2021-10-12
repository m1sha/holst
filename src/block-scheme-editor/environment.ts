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

  update () {
    this.scene.clearAll()
    for (const block of this.blocks) {
      drawBlock(this.scene, block)
    }
    this.scene.render()
  }
}
