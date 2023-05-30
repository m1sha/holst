export interface RasterDTO {
  type: 'raster'
  id: string
  name: string
  order: number
  anchor?: string
  transform?: string
  src: string
  srcRect: { x: number, y: number, width: number, height: number }
  distRect: { x: number, y: number, width: number, height: number }
}
