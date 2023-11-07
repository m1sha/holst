import { HtmlText } from './html-text'
import { StyleManager } from '../styles/style-manager'
import { uid } from '../../utils/uid'
import { HtmlImg } from './html-img'
import { HtmlButton } from './html-button'
import { HtmlContainerElement } from './html-element'

export class HtmlLayer {
  readonly id: string
  elements: (HtmlText | HtmlImg | HtmlButton | HtmlContainerElement)[] = []
  #order: number = 0
  protected onClearing: (() => boolean | void) | null = null
  useContainer: boolean = true
  containerElement: string = 'div'
  name: string

  constructor (order: number, _: StyleManager, name?: string) {
    this.id = uid()
    this.name = name ?? 'layer-' + this.id
    this.order = order
  }

  get order () {
    return this.#order
  }

  set order (value: number) {
    this.#order = value
    this.elements.forEach(text => (text.order = this.#order))
  }

  get modified () {
    return this.elements.some(text => text.modified)
  }

  add (text: HtmlText | HtmlImg | HtmlButton | HtmlContainerElement): this {
    this.elements.push(text)
    text.order = this.order
    return this
  }

  clear () {
    if (this.onClearing && this.onClearing() === false) return
    this.elements = []
  }
}
