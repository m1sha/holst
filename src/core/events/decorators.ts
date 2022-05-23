export class MouseEventDecorator {
  origin: MouseEvent
  constructor (event: MouseEvent | WheelEvent) {
    this.origin = event
  }

  get x (): number {
    return this.origin.offsetX
  }

  get y (): number {
    return this.origin.offsetY
  }
}

export class KeyboardEventDecorator {
  origin: KeyboardEvent
  constructor (event: KeyboardEvent) {
    this.origin = event
  }
}

export class FocusEventDecorator {
  origin: FocusEvent
  constructor (event: FocusEvent) {
    this.origin = event
  }
}
