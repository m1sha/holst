import { Viewport } from '../../viewport'
import { Scene } from '../../scene'
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
    this.hScrollBar = new HScrollBar(10, 0, 70, 5, viewport, this.style)
    this.hScrollBar.onBackButtonClick = () => (this.viewport.x -= this.hScrollBar.step)
    this.hScrollBar.onForwardButtonClick = () => (this.viewport.x += this.hScrollBar.step)
    this.vScrollBar = new VScrollBar(0, 0, 500, 5, viewport, this.style)
    this.vScrollBar.onBackButtonClick = () => (this.viewport.y -= this.vScrollBar.step)
    this.vScrollBar.onForwardButtonClick = () => (this.viewport.y += this.vScrollBar.step)
  }

  create () {
    const layer = this.scene.createLayer('scroll-box', true)
    this.hScrollBar.create(layer)
    this.vScrollBar.create(layer)
    this.vScrollBar.createBlock(layer)
  }

  get positionX (): number {
    return this.hScrollBar.position
  }

  set positionX (value: number) {
    this.hScrollBar.position = value
  }

  get maxX (): number {
    return this.hScrollBar.maxValue
  }

  get positionY (): number {
    return this.vScrollBar.position
  }

  set positionY (value: number) {
    this.vScrollBar.position = value
  }

  get maxY (): number {
    return this.vScrollBar.maxValue
  }
}
