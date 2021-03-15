import { EventType } from './event-type'
import { Point } from './point'
import { Scene } from './scene'

export class EventHandler {
  constructor (scene: Scene) {
    const { canvas } = scene.ctx
    canvas.onmousemove = e => this.doAction('move', e, scene)
    canvas.onmouseleave = e => this.doAction('leave', e, scene)
  }

  on: (eventType: EventType, point: Point) => void

  private doAction (eventType: EventType, e: MouseEvent, scene: Scene): void {
    const x = e.offsetX
    const y = e.offsetY
    this.onWrap(scene, eventType, { x, y })
    scene.render()
  }

  private onWrap (cs: Scene, eventType: EventType, point: Point) {
    cs.freeDynamic()
    if (this.on) this.on(eventType, point)
  }
}
