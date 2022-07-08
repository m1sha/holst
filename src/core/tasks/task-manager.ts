import { Task, TaskOption } from './task'
import { removeItem } from '../../tools/array'
import millis from './millis'

export class TaskManager {
  private tasks: Task[] = []

  add (name: string, option: TaskOption) {
    const task = new Task(name, option)
    this.tasks.push(task)
    return task
  }

  invoke (timeStamp: number) {
    for (const task of this.tasks) {
      if (task.isCanceled) continue

      const t = millis()
      if (!task.isTime(t)) continue
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

      task.execute(t, timeStamp)
    }

    this.garbageCollect()
  }

  private garbageCollect () {
    while (true) {
      const task = this.tasks.filter(p => p.isCanceled || (!p.infinity && p.isDone))[0]
      if (!task) break
      removeItem(this.tasks, p => p.id === task.id)
    }
  }
}
