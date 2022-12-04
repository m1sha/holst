import { State } from '../../model/state'

export abstract class Component<TRootElement extends HTMLElement> {
  protected state: State
  #rootElement: TRootElement | null = null

  constructor (state: State) {
    this.state = state
  }

  get rootElement (): TRootElement {
    if (!this.#rootElement) {
      this.#rootElement = document.createElement(this.elementType) as TRootElement
      this.#rootElement.className = this.name
      this.onElementSetting(this.#rootElement)
    }
    return this.#rootElement
  }

  protected abstract get name (): string
  protected abstract get elementType (): string
  protected onElementSetting (element: TRootElement) {}
}
