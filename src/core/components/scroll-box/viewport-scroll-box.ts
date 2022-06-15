import { ScrollBox } from './scroll-box'
import { Viewport } from '../../viewport'
import { Scene } from '../../scene'

export class ViewportScrollBox extends ScrollBox {
  private viewport: Viewport

  constructor (scene: Scene, viewport: Viewport) {
    super(scene, viewport)
    this.viewport = viewport
    this.onCreated = () => {
      this.horizontalBar.onBackButtonClick = () => (this.viewport.x -= this.horizontalBar.step)
      this.horizontalBar.onForwardButtonClick = () => (this.viewport.x += this.horizontalBar.step)
      this.verticalBar.onBackButtonClick = () => (this.viewport.y -= this.verticalBar.step)
      this.verticalBar.onForwardButtonClick = () => (this.viewport.y += this.verticalBar.step)
    }
  }
}
