import { ScrollBox } from './scroll-box'
import { Viewport } from '../../core/viewport'
import { Scene } from '../../core/scene'
import { Size } from '../../core/size'

export class ViewportScrollBox extends ScrollBox {
  private viewport: Viewport

  constructor (scene: Scene, containerSize: Size, viewport: Viewport) {
    super(scene, containerSize)
    this.viewport = viewport
    this.maxX = this.viewport.width
    this.maxY = this.viewport.height
    this.onCreated = () => {
      this.horizontalBar.onBackButtonClick = () => (this.viewport.x -= this.horizontalBar.step)
      this.horizontalBar.onForwardButtonClick = () => (this.viewport.x += this.horizontalBar.step)
      this.verticalBar.onBackButtonClick = () => (this.viewport.y -= this.verticalBar.step)
      this.verticalBar.onForwardButtonClick = () => (this.viewport.y += this.verticalBar.step)
    }
  }
}
