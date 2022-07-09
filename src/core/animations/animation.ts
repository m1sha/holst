import { TaskManager } from '../tasks/task-manager'
import { Task, FrameChangeCallback } from '../tasks/task'

export type AnimationOptions = { timeout?: number, duration?: number, infinity?: boolean }
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

  start () {
    this.task.start()
  }

  cancel () {
    this.task.isCanceled = true
  }
}
