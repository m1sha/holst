/* global AnimationFrameProvider */
import { removeItem } from '../tools/array'
import { uid } from '../tools/uid'
import { Renderer2D } from './renderer2D'
import { Scene } from './scene'

const millis = () => new Date().getTime()

export interface FrameInfo {
  timeStamp: number,
  startTime: number,
  сountdown: number,
  percent: number,
  map: (min: number, max: number) => number
}

class Task {
  readonly id: string
  readonly name: string
  private delegate: (f: FrameInfo) => void
  private timeout: number
  private duration: number
  readonly infinity: boolean
  private сountdown: number
  isCanceled: boolean
  isDone: boolean
  isStarted: boolean

  constructor (name: string, delegate: (f: FrameInfo) => void, timeout: number, duration: number, infinity: boolean) {
    this.name = name
    this.id = uid()
    this.delegate = delegate
    this.timeout = timeout
    this.duration = duration
    this.infinity = infinity
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
    this.delegate({
      startTime: time,
      сountdown: timeLeft,
      percent,
      timeStamp,
      map: (min: number, max: number): number => {
        return ((max - min) / 100 * percent) + min
      }
    })
  }

  reset () {
    this.сountdown = millis()
    this.isDone = false
  }

  done () {
    this.isDone = true
    this.isStarted = false
  }
}

export class AnimationTask {
  private task: Task

  constructor (task: Task) {
    this.task = task
  }

  get name (): string {
    return this.task.name
  }

  get isStarted (): boolean {
    return this.task.isStarted
  }

  get isDone (): boolean {
    return this.task.isDone
  }

  get isCanceled (): boolean {
    return this.task.isCanceled
  }

  cancel () {
    this.task.isCanceled = true
  }
}

export class AnimationQueue {
  private renderer: Renderer2D
  private scene: Scene
  private timerId!: number
  private tasks: Task[] = []
  private animationFrameProvider: AnimationFrameProvider

  constructor (scene: Scene, renderer: Renderer2D, animationFrameProvider?: AnimationFrameProvider) {
    this.scene = scene
    this.renderer = renderer
    this.animationFrameProvider = animationFrameProvider || window
  }

  start (): void {
    this.timerId = this.animationFrameProvider.requestAnimationFrame(timeStamp => {
      this.invokeTasks(timeStamp)
    })
  }

  stop (): void {
    this.animationFrameProvider.cancelAnimationFrame(this.timerId)
  }

  createTask (name: string, delegate: (f: FrameInfo) => void, timeout: number, duration: number, infinity: boolean = true): AnimationTask {
    const origin = this.tasks.filter(p => p.name === name)[0]
    if (origin) {
      if (origin.isCanceled) this.removeTask(origin.name)
      else return new AnimationTask(origin)
    }

    const task = new Task(name, delegate, timeout, duration, infinity)
    this.tasks.push(task)
    return new AnimationTask(task)
  }

  removeTask (name: string) {
    removeItem(this.tasks, p => p.name === name)
  }

  private invokeTasks (timeStamp: number) {
    for (const task of this.tasks) {
      if (task.isCanceled) continue

      const t = millis()
      if (!task.isTime(t) && !task.isStarted) continue
      if (!task.isStarted) task.start()
      if (task.isDone) {
        if (task.infinity) task.reset()
        continue
      }

      if (!task.canRepeat(t)) {
        task.done()
        continue
      }

      if (task.isCanceled) continue
      this.scene.clearActiveLayer()
      this.renderer.clear()
      task.execute(t, timeStamp)
      this.renderer.render(this.scene)
    }

    this.garbageCollect()

    this.timerId = window.requestAnimationFrame(r => {
      this.invokeTasks(r)
    })
  }

  private garbageCollect () {
    while (true) {
      const task = this.tasks.filter(p => p.isDone || p.isCanceled)[0]
      if (!task) break
      removeItem(this.tasks, p => p.id === task.id)
    }
  }
}
