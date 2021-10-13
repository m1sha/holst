import { Point } from '../core/point'
import { Rect } from '../core/rect'
import { Scene } from '../core/scene'
import { CommandController } from './command-controller'
import { Block } from './elements/block'
import { ElementFactory } from './elements/element-factory'
import drawBlock from './handlers/draw-block-action'
import drawSelectRegion from './handlers/draw-select-region'
import { RuntimeController } from './runtime-controller'
export class Editor {
  scene: Scene
  blocks: Block[] = []
  selectRegion: Rect | null = null
  controller: CommandController

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas)
    this.controller = new CommandController(this)
    const runtimeController = new RuntimeController(this, this.controller)
    runtimeController.start()
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
      if (this.selectRegion) drawSelectRegion(this.scene, this.selectRegion)
    }
    this.scene.render()
  }

  garbageCollector (ids: number[]) {
    const forDelete = []
    for (let i = 0; i < this.blocks.length; i++) {
      const uid = this.blocks[i]._uid
      if (ids.indexOf(uid) > -1) continue
      forDelete.push(i)
    }
    for (const index of forDelete) {
      this.blocks.splice(index, 1)
    }
  }

  get factory () {
    return ElementFactory
  }
}
