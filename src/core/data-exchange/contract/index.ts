import { AnchorDTO } from './anchor'
import { DrawableDTO } from './drawable'

export interface LayerDTO {
  id: string
  name: string
  order: number
  drawables: DrawableDTO[]
}

export interface SceneDTO {
  version: string
  layers: LayerDTO[]
  anchors: AnchorDTO[]
}
