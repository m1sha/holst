import { HtmlElementBase } from './html-element'

export class HtmlButton extends HtmlElementBase<HTMLImageElement> {
  constructor (title: string) {
    super('button')

    this.htmlElement.id = this.id
    this.htmlElement.innerHTML = title
    this.htmlElement.classList.add('holst-btn')
    const el = this.htmlElement as any
    el.obj = this
  }

  get disabled () {
    return Boolean(this.htmlElement.getAttribute('disabled'))
  }

  set disabled (value: boolean) {
    value ? this.htmlElement.setAttribute('disabled', 'disabled') : this.htmlElement.removeAttribute('disabled')
  }

  addEventListener (_: 'click', callback: (e: MouseEvent) => void) {
    this.htmlElement.addEventListener('click', e => callback(e))
  }

  protected update (): void {}
}
