import { Point } from '../../core/point'
import { Scene } from '../../core/scene'
import { Block } from './block'
import drawBlock from '../handlers/draw-block-action'
import drawSelectRegion from '../handlers/draw-select-region'
import { Rect } from '../../core/rect'
import { GarbageCollector } from '../garbage-collector'
import { Renderer2D } from '../../core/context2d'

export class ElementStorage {
  private scene: Scene
  private renderer: Renderer2D
  blocks: Block[] = []
  selectRegion: Rect | null = null

  constructor (scene: Scene, renderer: Renderer2D) {
    this.scene = scene
    this.renderer = renderer
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
        const yes = this.renderer.ctx.isPointInPath(shape.createPath(), point.x, point.y)
        if (!yes) continue
        return block
      }
    }
    return null
  }

  applyChanges (): void {
    this.scene.clearActiveLayer()
    this.renderer.clear()
    for (const block of this.blocks) {
      drawBlock(this.scene, block)
      if (this.selectRegion) drawSelectRegion(this.scene, this.selectRegion)
    }
    this.renderer.render(this.scene)
  }

  removeUnlinked (options: { blockIds: number[] }) {
    GarbageCollector.collect(options.blockIds, this.blocks)
  }
}
