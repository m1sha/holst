import { Task } from './task'
import { removeItem } from '../../utils/array'
export class TaskManager {
  private tasks: Task[] = []

  add (task: Task): void {
    this.tasks.push(task)
  }

  invoke (timeStamp: number) {
    for (const task of this.tasks) {
      if (task.isCanceled || !task.isStarted) continue
      if (task.isStarted || !task.was) task.setCountdown(timeStamp)

      if (!task.isTime(timeStamp)) continue

      if (task.isDone) {
        if (task.infinity) task.reset()
        continue
      }

      if (!task.canRepeat(timeStamp)) {
        if (task.was) task.done()
        continue
      }

      if (task.isCanceled) continue

      task.execute(timeStamp, timeStamp)
      task.was = true
    }

    this.garbageCollect()
  }

  private garbageCollect () {
    while (true) {
      const task = this.tasks.find(p => p.isCanceled)
      if (!task) break
      removeItem(this.tasks, p => p.id === task.id)
    }
  }
}
