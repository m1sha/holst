import { ScrollBarStyle } from './scrollbar-style'
import { Layer } from '../../layers'
import { Size } from '../../size'
import { Rect } from '../../rect'
import Shape from '../../shape'
import { ScrollbarBehavior } from './scrollbar-behavior'
import { ScrollBarDesign } from './scrollbar-design'

export abstract class ScrollBar {
  private design: ScrollBarDesign | null = null
  protected tracker: Shape | null = null
  protected backButton: Shape | null = null
  protected forwardButton: Shape | null = null
  protected thumbButton: Shape | null = null
  protected type?: 'h' | 'v'
  protected behavior: ScrollbarBehavior | null = null
  protected boxSize: Size
  protected splitSize: number = 2
  position: number
  minValue: number
  maxValue: number
  step: number
  style: ScrollBarStyle
  onBackButtonClick: (() => void) | null = null
  onForwardButtonClick: (() => void) | null = null

  constructor (boxSize: Size, style: ScrollBarStyle) {
    this.minValue = 0
    this.position = 0
    this.maxValue = 100
    this.step = 5
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
    const limits = this.design.getThumbLimitRect()

    const controls = [this.backButton, this.forwardButton, this.thumbButton, this.tracker]
    this.behavior = new ScrollbarBehavior(this.type!!, controls, this.style, this.step, limits)
    this.behavior.onBackButtonClick = () => this.onBackButtonClick && this.onBackButtonClick()
    this.behavior.onForwardButtonClick = () => this.onForwardButtonClick && this.onForwardButtonClick()
  }

  createBlock (layer: Layer) {
    const { track } = this.style
    const { width, height } = this.boxSize
    layer
      .createShape({ fillStyle: track.color, strokeStyle: track.border })
      .rect(new Rect(width - track.width, height - track.width, track.width, track.width))
  }
}
