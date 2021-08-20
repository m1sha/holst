import Shape from './shape'
import { Text } from './label'
import { TextStyle } from './label-style'
import { EventType } from './event-type'
export default interface Context2DBase {
  width: number
  height: number
  drawText(label: Text, mask?: Shape): void
  drawShape (shape: Shape, mask?: Shape): void
  measureText (text: string, style: TextStyle)
  on (a: (eventType: EventType, event: Event | MouseEvent | KeyboardEvent) => void, ...events: EventType[])
}
