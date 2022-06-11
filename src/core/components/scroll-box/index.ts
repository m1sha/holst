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
    this.hScrollBar = new HScrollBar(90, 400, 5, viewport, this.style)
    this.hScrollBar.onBackButtonClick = () => (this.viewport.x -= this.hScrollBar.step)
    this.hScrollBar.onForwardButtonClick = () => (this.viewport.x += this.hScrollBar.step)
    this.vScrollBar = new VScrollBar(40, 490, 5, viewport, this.style)
    this.vScrollBar.onBackButtonClick = () => (this.viewport.y -= this.vScrollBar.step)
    this.vScrollBar.onForwardButtonClick = () => (this.viewport.y += this.vScrollBar.step)
  }

  create () {
    const layer = this.scene.createLayer('scroll-box', true)
    this.hScrollBar.create(layer)
    this.vScrollBar.create(layer)
    this.createBlock(layer)
  }

  move (x: number, y: number) {
    this.hScrollBar.position = x
    this.vScrollBar.position = y
  }

  private createBlock (layer: Layer) {
    const { trackSize, trackBackgroundColor, trackBorderColor } = this.style
    const { width, height } = this.viewport
    layer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize, trackSize, trackSize))
  }
}
