import { DrawableDTO } from './drawable'

export interface LayerDTO {
  id: string
  drawables: DrawableDTO[]
}

export interface SceneDTO {
  version: string
  layers: LayerDTO[]
}
