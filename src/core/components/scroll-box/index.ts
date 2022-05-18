import { Viewport } from '../../viewport'
import { Scene } from '../../scene'
import { Rect } from '../../rect'
import { Layer } from '../../layers'

import { ScrollBarStyle, defaultScrollBarStyle } from './scrollbar-style'
import { HScrollBar, VScrollBar } from './scrollbar'

export class ScrollBox {
  private viewport: Viewport
  private scene: Scene
  private hScrollBar: HScrollBar
  private vScrollBar: VScrollBar
  style: ScrollBarStyle
  constructor (scene: Scene, viewport: Viewport) {
    this.scene = scene
    this.viewport = viewport
    this.style = defaultScrollBarStyle()
    this.hScrollBar = new HScrollBar()
    this.vScrollBar = new VScrollBar()
  }

  create () {
    const layer = this.scene.createLayer('scroll')
    this.hScrollBar.create(layer, this.viewport, this.style)
    this.vScrollBar.create(layer, this.viewport, this.style)
    this.createBlock(layer)
  }

  private createBlock (layer: Layer) {
    const { trackSize, trackBackgroundColor, trackBorderColor } = this.style
    const { width, height } = this.viewport
    layer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize, trackSize, trackSize))
  }
}
