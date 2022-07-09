import { uid } from '../../tools/uid'
import millis from './millis'

export type Between = { then: (delegate: (value: number) => void) => void }
export type Frame = {
  timeStamp: number,
  startTime: number,
  сountdown: number,
  percent: number,
  map: (min: number, max: number) => number
  between: (min: number, max: number) => Between
}
export type FrameChangeCallback = (frame: Frame) => void
export type TaskOption = { timeout?: number, duration?: number, infinity?: boolean }

export class Task {
  readonly id: string
  action: null | FrameChangeCallback
  private timeout: number
  private duration: number
  readonly infinity: boolean
  private сountdown: number
  isCanceled: boolean
  isDone: boolean
  isStarted: boolean

  constructor (option: TaskOption) {
    this.id = uid()
    this.action = null
    this.timeout = option.timeout ?? 0
    this.duration = option.duration ?? 100
    this.infinity = option.infinity ?? false
    this.сountdown = millis()
    this.isDone = false
    this.isCanceled = false
    this.isStarted = false
  }

  isTime (time: number) {
    return time > this.сountdown + this.timeout
  }

  canRepeat (time: number) {
    return this.isTime(time) && time < this.сountdown + this.timeout + this.duration
  }

  start () {
    this.isStarted = true
  }

  execute (time: number, timeStamp: number) {
    const timeLeft = this.сountdown + this.timeout + this.duration - time
    const percent = (100 / this.duration) * (this.duration - timeLeft)
    if (!this.action) throw new Error(`An action at the task ${this.id} is not defined`)
    this.action({
      startTime: time,
      сountdown: timeLeft,
      percent,
      timeStamp,
      map: (min: number, max: number): number => {
        return ((max - min) / 100 * percent) + min
      },
      between: (min: number, max: number): Between => {
        return {
          then: (r) => {
            if (percent >= min && percent <= max) r(percent)
          }
        }
      }
    })
  }

  reset () {
    this.сountdown = millis()
    this.isDone = false
    this.isStarted = true
  }

  done () {
    this.isDone = true
    this.isStarted = false
  }
}
