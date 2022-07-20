import { Size } from '../../core/size'
import { Scene } from '../../core/scene'
import { ScrollBarStyle, defaultScrollBarStyle } from './scrollbar-style'
import { VScrollBar } from './v-scrollbar'
import { HScrollBar } from './h-scrollbar'

export class ScrollBox {
  private scene: Scene
  protected horizontalBar: HScrollBar
  protected verticalBar: VScrollBar
  style: ScrollBarStyle
  containerSize: Size
  onCreated: (() => void) | null = null

  constructor (scene: Scene, containerSize: Size) {
    this.scene = scene
    this.containerSize = containerSize
    this.style = defaultScrollBarStyle()
    this.horizontalBar = new HScrollBar(this.containerSize, this.style)
    this.verticalBar = new VScrollBar(this.containerSize, this.style)
  }

  create () {
    const layer = this.scene.createLayer('scroll-box', true)
    this.horizontalBar.create(layer)
    this.verticalBar.create(layer)
    this.verticalBar.createBlock(layer)
    if (this.onCreated) this.onCreated()
  }

  get positionX (): number {
    return this.horizontalBar.value
  }

  set positionX (value: number) {
    this.horizontalBar.value = value
  }

  get maxX (): number {
    return this.horizontalBar.maxValue
  }

  set maxX (value: number) {
    this.horizontalBar.maxValue = value
  }

  get positionY (): number {
    return this.verticalBar.value
  }

  set positionY (value: number) {
    this.verticalBar.value = value
  }

  get maxY (): number {
    return this.verticalBar.maxValue
  }

  set maxY (value: number) {
    this.verticalBar.maxValue = value
  }
}
