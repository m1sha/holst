import { ScrollBar } from './scrollbar'
import { Layer } from '../../layers'
import { ScrollBarDesign } from './scrollbar-design'
import { VScrollbarDesign } from './v-scrollbar-design'

export class VScrollBar extends ScrollBar {
  protected type: 'h' | 'v' | undefined = 'v'

  getScrollBarDesign (layer: Layer): ScrollBarDesign {
    return new VScrollbarDesign(this.position, this.minValue, this.maxValue, this.containerSize, this.splitSize, this.style, layer)
  }
}
