export abstract class Tool {
  abstract get name (): string
}

export class SelectTool extends Tool {
  get name (): string { return 'select' }
}

export class CreateTextTool extends Tool {
  get name (): string { return 'create-text' }
}

export class CreateRectTool extends Tool {
  get name (): string { return 'create-rect' }
}
