import { GroupDTO } from './group'
import { RasterDTO } from './raster'
import { ShapeDTO } from './shape'
import { TextBlockDTO } from './text-block'

export type DrawableDTO = ShapeDTO | TextBlockDTO | GroupDTO | RasterDTO
