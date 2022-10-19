import { Task } from './task'
import { removeItem } from '../../utils/array'
export class TaskManager {
  private tasks: Task[] = []

  add (task: Task): void {
    this.tasks.push(task)
  }

  invoke (timeStamp: number) {
    for (const task of this.tasks) {
      if (task.isCanceled || !task.isStarted || task.isFrozen) continue
      if (task.isStarted || !task.was) task.setCountdown(timeStamp)

      if (!task.isTime(timeStamp)) continue

      if (!task.canRepeat(timeStamp)) {
        if (task.was) task.done()
        if (task.isDone && task.infinity) task.reset()
        continue
      }

      if (task.isCanceled) continue

      task.execute(timeStamp, timeStamp)
      task.was = true
    }

    this.garbageCollect()
  }

  clearAll () {
    this.tasks = []
  }

  private garbageCollect () {
    while (true) {
      const task = this.tasks.find(p => p.isCanceled /* || (!p.infinity && p.isDone) */)
      if (!task) break
      removeItem(this.tasks, p => p.id === task.id)
    }
  }
}
