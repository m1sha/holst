import { uid } from '../../utils/uid'
// import millis from './millis'

export type Between = { then: (delegate: (value: number) => void) => void }
export type Frame = {
  timeStamp: number,
  startTime: number,
  сountdown: number,
  percent: number,
  t: number,
  map: (min: number, max: number) => number
  between: (min: number, max: number) => Between
}
export type FrameChangeCallback = (frame: Frame) => void
export type TaskFinishCallBack = () => void
export type TaskOption = { timeout?: number, duration?: number, infinity?: boolean }

export class Task {
  readonly id: string
  action: null | FrameChangeCallback
  finish: null | TaskFinishCallBack
  private timeout: number
  private duration: number
  readonly infinity: boolean
  private сountdown: number = -1
  isCanceled: boolean
  isDone: boolean
  isStarted: boolean
  was: boolean = false

  constructor (option: TaskOption) {
    this.id = uid()
    this.action = null
    this.finish = null
    this.timeout = option.timeout ?? 0
    this.duration = option.duration ?? 100
    this.infinity = option.infinity ?? false
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
    this.reset()
  }

  execute (time: number, timeStamp: number) {
    const timeLeft = this.сountdown + this.timeout + this.duration - time
    const percent = (100 / this.duration) * (this.duration - timeLeft)
    if (!this.action) throw new Error(`An action at the task ${this.id} is not defined`)
    this.action({
      startTime: time,
      сountdown: timeLeft,
      percent,
      t: percent / 100,
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
    this.isDone = false
    this.isStarted = true
    this.was = false
    this.сountdown = -1
  }

  done () {
    this.isDone = true
    if (this.finish) this.finish()
    this.isStarted = false
  }

  setCountdown (t: number) {
    if (this.сountdown === -1) this.сountdown = t
  }
}
