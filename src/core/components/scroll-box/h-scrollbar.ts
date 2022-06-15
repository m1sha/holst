import { ScrollBar } from './scrollbar'
import { Layer } from '../../layers'
import { ScrollBarDesign } from './scrollbar-design'
import { HScrollbarDesign } from './h-scrollbar-design'

export class HScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'h'

  getScrollBarDesign (layer: Layer): ScrollBarDesign {
    return new HScrollbarDesign(this.position, this.minValue, this.maxValue, this.containerSize, this.splitSize, this.style, layer)
  }
}
