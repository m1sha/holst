import { ScrollBarStyle } from './scrollbar-style'
import { Layer } from '../../layers'
import { Size } from '../../size'
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
  behavior: ScrollbarBehavior | null = null
  position: number
  maxValue: number
  style: ScrollBarStyle
  boxSize: Size
  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (position: number, maxValue: number, boxSize: Size, style: ScrollBarStyle) {
    this.position = position ?? 0
    this.maxValue = maxValue ?? 0
    this.style = style
    this.boxSize = boxSize
  }

  abstract getScrollBarDesign (layer: Layer): ScrollBarDesign

  create (layer: Layer): void {
    this.design = this.getScrollBarDesign(layer)
    this.tracker = this.design.createTracker()
    this.backButton = this.design.createBackArrowButton()
    this.forwardButton = this.design.createForwardArrowButton()
    this.design.createArrows(this.type!!)
    this.thumbButton = this.design.createThumbButton()
    this.behavior = new ScrollbarBehavior(this.type!!, [this.backButton, this.forwardButton, this.thumbButton, this.tracker], this.style)
    this.behavior.onBackButtonClick = () => this.onBackButtonClick && this.onBackButtonClick()
    this.behavior.onForwardButtonClick = () => this.onForwardButtonClick && this.onForwardButtonClick()
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
