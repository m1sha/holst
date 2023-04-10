import { Anchor } from '../../anchor'
import { AnchorDTO } from '../contract/anchor'
import { Drawable } from '../../drawable'
import { Assets } from '../../assets'

export interface ImportOptions {
  anchors: Anchor[]
  anchorsDto: AnchorDTO[]
  drawables: Drawable[]
  assets: Assets
}
