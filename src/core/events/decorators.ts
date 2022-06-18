export class MouseEventDecorator {
  readonly origin: MouseEvent
  readonly pressed: boolean
  readonly hit: boolean
  constructor (event: MouseEvent | WheelEvent, pressed: boolean = false, hit: boolean = false) {
    this.origin = event
    this.pressed = pressed
    this.hit = hit
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

export class DragEventDecorator {
  origin: DragEvent
  constructor (event: DragEvent) {
    this.origin = event
  }
}
