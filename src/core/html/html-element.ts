import { removeItem } from '../../utils/array'
import { uid } from '../../utils/uid'

export abstract class HtmlElementBase<T extends HTMLElement> {
  #modified: boolean = true
  #order: number = 0
  #htmlElement: T
  #display: string
  readonly id: string
  #entered: boolean = false

  onEnter: ((e: MouseEvent) => void) | null = null
  onLeave: ((e: MouseEvent) => void) | null = null

  constructor (tagName: string) {
    this.id = uid()
    this.#htmlElement = document.createElement(tagName) as T
    this.#htmlElement.id = this.id
    this.htmlElement.style.position = 'absolute'
    this.#display = this.htmlElement.style.display

    this.htmlElement.addEventListener('mouseenter', e => {
      if (this.#entered) return
      this.#entered = true
      if (this.onEnter) this.onEnter(e)
    })
    this.htmlElement.addEventListener('mouseleave', e => {
      if (!this.#entered) return
      this.#entered = false
      if (this.onLeave) this.onLeave(e)
    })
  }

  get entered () {
    return this.#entered
  }

  get modified () {
    return this.#modified
  }

  get order () {
    return this.#order
  }

  set order (value: number) {
    this.htmlElement.style.zIndex = value.toString()
    this.#order = value
    this.update()
  }

  get hidden () {
    return this.htmlElement.style.display === 'none'
  }

  set hidden (value: boolean) {
    this.htmlElement.style.display = value ? 'none' : this.#display
    this.update()
  }

  get fixed () {
    return this.htmlElement.style.position === 'absolute'
  }

  set fixed (value: boolean) {
    this.htmlElement.style.position = value ? 'fixed' : 'absolute'
  }

  get name () {
    return this.htmlElement.getAttribute('name')
  }

  set name (value: string | null) {
    value ? this.htmlElement.setAttribute('name', value) : this.htmlElement.removeAttribute('name')
  }

  get elementId () {
    return this.htmlElement.id
  }

  set elementId (value: string) {
    this.htmlElement.id = value
  }

  get elementStyle () {
    return this.htmlElement.style
  }

  get x (): number { return parseInt(this.htmlElement.style.left.replace('px', '')) }
  set x (value: number) { this.htmlElement.style.left = value + 'px' }
  get y (): number { return parseInt(this.htmlElement.style.top.replace('px', '')) }
  set y (value: number) { this.htmlElement.style.top = value + 'px' }
  get width (): number { return parseInt(this.htmlElement.style.width.replace('px', '')) }
  set width (value: number) { this.htmlElement.style.width = value + 'px' }
  get height (): number { return parseInt(this.htmlElement.style.height.replace('px', '')) }
  set height (value: number) { this.htmlElement.style.height = value + 'px' }

  addClass (className: string): void {
    this.htmlElement.classList.add(className)
  }

  hasClass (className: string): boolean {
    return this.htmlElement.classList.contains(className)
  }

  removeClass (className: string): void {
    this.htmlElement.classList.remove(className)
  }

  get htmlElement () {
    return this.#htmlElement
  }

  protected abstract update (): void
}

/* global HTMLElementEventMap */
export class HtmlContainerElement extends HtmlElementBase<HTMLElement> {
  private eventMap: Record<string, (e: any) => void> = {}
  readonly items: HtmlContainerElement[] = []
  protected update (): void {}

  addChild (element: HtmlContainerElement | string) {
    if (typeof element === 'string') {
      const elem = new HtmlContainerElement(element)
      this.htmlElement.appendChild(elem.htmlElement)
      this.items.push(elem)
      return elem
    }

    this.htmlElement.appendChild(element.htmlElement)
    this.items.push(element)
  }

  removeChild (elementOrId: HtmlContainerElement | string): void {
    if (typeof elementOrId === 'string') {
      const elem = this.items.find(p => p.id === elementOrId)
      if (!elem) throw new Error('element is not found')
      this.htmlElement.removeChild(elem.htmlElement)
      removeItem(this.items, p => p.id === elementOrId)
      return
    }

    this.htmlElement.removeChild(elementOrId.htmlElement)
    removeItem(this.items, p => p.id === elementOrId.id)
  }

  on <K extends keyof HTMLElementEventMap> (eventName: K, callback: (e: HTMLElementEventMap[K]) => void) {
    this.eventMap[eventName] = callback
    this.htmlElement.addEventListener(eventName, callback)
  }

  off<K extends keyof HTMLElementEventMap> (eventName: K) {
    this.htmlElement.removeEventListener(eventName, this.eventMap[eventName])
    delete this.eventMap[eventName]
  }

  static create (name: string) {
    return new HtmlContainerElement(name)
  }
}
