export interface TestCommand {}

export class ArcCommand implements TestCommand {
  readonly x: number
  readonly y: number
  readonly radius: number
  readonly startAngle: number
  readonly endAngle: number
  readonly counterclockwise?: boolean

  constructor (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.counterclockwise = counterclockwise
  }
}

export class MoveToCommand implements TestCommand {
  readonly x: number
  readonly y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class LineToCommand implements TestCommand {
  readonly x: number
  readonly y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class TestCommandDispatcher {
  items: TestCommand[] = []

  add (item: TestCommand) {
    this.items.push(item)
  }

  pop<T> (): T {
    const item = this.items[0] as T
    this.items.splice(0, 1)
    return item
  }
}
