export abstract class Tool {
  abstract get name (): string
}

export class SelectTool extends Tool {
  get name (): string { return 'select' }
}

export class MoveTool extends Tool {
  get name (): string { return 'move' }
}

export class RotateTool extends Tool {
  get name (): string { return 'rotate' }
}

export class TransformTool extends Tool {
  get name (): string { return 'transform' }
}

export class CreateTextTool extends Tool {
  get name (): string { return 'create-text' }
}

export class CreateRectTool extends Tool {
  get name (): string { return 'create-rect' }
}
