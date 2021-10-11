export type AnyImageType = HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap
export interface Image {
  src: AnyImageType
  sx: number
  sy: number
  sWidth?: number
  sHeight?: number
  dx?: number
  dy?: number
  dWidth?: number
  dHeight?: number
}
export type Images = Image[]
