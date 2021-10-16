import Shape from './shape'
import { Text, TextBlock } from './label'
import { TextStyle } from './label-style'
import { EventType } from './event-type'
export default interface Context2DBase {
  width: number
  height: number
  drawText(label: Text, mask?: Shape): void
  drawTextBlock(label: TextBlock, mask?: Shape): void
  drawShape (shape: Shape, mask?: Shape): void
  measureText (text: string, style: TextStyle)
  createPath(): Path2D
  drawImage(image: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap, sx: number, sy?: number, sWidth?: number, sHeight?: number, dx?: number, dy?: number, dWidth?: number, dHeight?: number): void
  on (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[])
}
