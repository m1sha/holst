import { Editor } from './editor'

export function createPaintEditor (canvas: HTMLCanvasElement) {
  return new Editor(canvas)
}
