export interface IImageData {
  readonly width: number
  readonly height: number
  readonly data: Uint8ClampedArray
  readonly colorSpace: 'display-p3' | 'srgb'
}
