import { TaskManager } from '../tasks/task-manager'
import { Task, FrameChangeCallback, TaskFinishCallBack } from '../tasks/task'

export type AnimationOptions = { timeout?: number, duration?: number, infinity?: boolean }
export type AnimationState = 'playing' | 'paused' | 'stopped' | 'died'
export class Animation {
  private options: AnimationOptions
  private task: Task

  constructor (taskManager: TaskManager, options?: AnimationOptions) {
    this.options = options ?? {}
    this.task = new Task(this.options)
    taskManager.add(this.task)
  }

  get timeout () {
    return this.options.timeout ?? 0
  }

  set timeout (value: number) {
    this.options.timeout = value
  }

  get action () {
    return this.task.action as FrameChangeCallback
  }

  set action (value: FrameChangeCallback) {
    this.task.action = value
  }

  get finish () {
    return this.task.finish as TaskFinishCallBack
  }

  set finish (value: TaskFinishCallBack) {
    this.task.finish = value
  }

  play (): Promise<void> {
    return this.task.start()
  }

  // pause () {
  //   this.task.isFrozen = true
  // }

  // resume () {
  //   this.task.isFrozen = false
  // }

  stop () {
    this.task.isStarted = false
    this.task.isDone = true
  }

  kill () {
    this.task.isCanceled = true
  }

  get state (): AnimationState {
    if (this.task.isCanceled) return 'died'
    if (this.task.isStarted) return 'playing'
    if (this.task.isFrozen) return 'paused'
    return 'stopped'
  }
}
