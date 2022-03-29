import { Editor } from './editor'

export function createEditor (canvas: HTMLCanvasElement) {
  const editor = new Editor(canvas)
  return editor
}
