import { Drawable, Layer, Scene } from '../../../src'
import { Component } from '../components/base/component'
import { SelectTool, Tool } from './tool'

type ReceiveListenerCallback = (sender: Component<HTMLElement>, data: any) => void
type ReceiveListener = { sender: Component<HTMLElement>, callback: ReceiveListenerCallback }

export class Editor {
  #selectedTool: Tool = new SelectTool()
  #selectedLayer: Layer | null = null
  #selectedDrawables: Drawable[] = []
  private callbacks: ReceiveListener[] = []
  private scene: Scene

  constructor (scene: Scene) {
    this.scene = scene
  }

  get selectedTool () { return this.#selectedTool }
  get selectedLayer () { return this.#selectedLayer }
  get selectedDrawables () { return this.selectedDrawables }

  send (sender: Component<HTMLElement>, data: any): void { this.callbacks.forEach(p => p.callback(sender, data)) }
  addReceiveListener (listener: ReceiveListener) { this.callbacks.push(listener) }
}
