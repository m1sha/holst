import { uid } from '../../../../src/utils/uid'

export abstract class Component<TRootElement extends HTMLElement> {
  readonly id: string = uid()
  #rootElement: TRootElement | null = null

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
