import { ScrollBarStyle } from './scrollbar-style'
import { Layer } from '../../layers'
import { Size } from '../../size'
import { Rect } from '../../rect'
import Shape from '../../shape'
import { ScrollbarBehavior } from './scrollbar-behavior'
import { ScrollBarDesign } from './scrollbar-design'
import { HScrollbarDesign } from './h-scrollbar-design'
import { VScrollbarDesign } from './v-scrollbar-design'

export abstract class ScrollBar {
  private design: ScrollBarDesign | null = null
  protected tracker: Shape | null = null
  protected backButton: Shape | null = null
  protected forwardButton: Shape | null = null
  protected thumbButton: Shape | null = null
  protected type?: 'h' | 'v'
  protected behavior: ScrollbarBehavior | null = null
  protected boxSize: Size
  position: number
  maxValue: number
  step: number
  style: ScrollBarStyle
  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (position: number, maxValue: number, step: number, boxSize: Size, style: ScrollBarStyle) {
    this.position = position ?? 0
    this.maxValue = maxValue ?? 0
    this.step = step
    this.style = style
    this.boxSize = boxSize
  }

  protected abstract getScrollBarDesign (layer: Layer): ScrollBarDesign

  create (layer: Layer): void {
    this.design = this.getScrollBarDesign(layer)
    this.tracker = this.design.createTracker()
    this.backButton = this.design.createBackArrowButton()
    this.forwardButton = this.design.createForwardArrowButton()
    this.thumbButton = this.design.createThumbButton()
    this.design.createArrows(this.type!!)

    const controls = [this.backButton, this.forwardButton, this.thumbButton, this.tracker]
    this.behavior = new ScrollbarBehavior(this.type!!, controls, this.style, this.step)
    this.behavior.onBackButtonClick = () => this.onBackButtonClick && this.onBackButtonClick()
    this.behavior.onForwardButtonClick = () => this.onForwardButtonClick && this.onForwardButtonClick()
  }

  createBlock (layer: Layer) {
    const { trackSize, trackBackgroundColor, trackBorderColor } = this.style
    const { width, height } = this.boxSize
    layer
      .createShape({ fillStyle: trackBackgroundColor, strokeStyle: trackBorderColor })
      .rect(new Rect(width - trackSize, height - trackSize, trackSize, trackSize))
  }
}

export class HScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'h'

  getScrollBarDesign (layer: Layer): ScrollBarDesign {
    return new HScrollbarDesign(this.position, this.maxValue, this.boxSize, this.style, layer)
  }
}

export class VScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'v'

  getScrollBarDesign (layer: Layer): ScrollBarDesign {
    return new VScrollbarDesign(this.position, this.maxValue, this.boxSize, this.style, layer)
  }
}
