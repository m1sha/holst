import { Task, TaskOption } from './task'
import { removeItem } from '../../tools/array'
import millis from './millis'

export class TaskManager {
  private tasks: Task[] = []

  create (option: TaskOption) {
    const task = new Task(option)
    this.tasks.push(task)
    return task
  }

  invoke (timeStamp: number) {
    for (const task of this.tasks) {
      if (task.isCanceled || !task.isStarted) continue

      const t = millis()
      if (!task.isTime(t)) continue

      if (task.isDone) {
        if (task.infinity) task.reset()
        continue
      }

      if (!task.canRepeat(t)) {
        task.done()
        continue
      }

      if (task.isCanceled) continue

      task.execute(t, timeStamp)
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
