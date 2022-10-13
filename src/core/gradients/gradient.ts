import { ColorStop } from './color-stop'
import { Color } from '../color'

export abstract class Gradient {
  stops: ColorStop[]

  constructor (stops?: ColorStop[]) {
    this.stops = stops ?? []
  }

  addStopColor (offset: number, color: string | Color): void
  // eslint-disable-next-line no-dupe-class-members
  addStopColor (stopColor: ColorStop): void
  // eslint-disable-next-line no-dupe-class-members
  addStopColor (...args: Array<any>): void {
    if (args.length === 1) {
      this.stops.push(args[0])
    }
    if (args.length === 2) {
      this.stops.push({ offset: args[0], color: args[1] })
    }
  }
}
