import { TextStyle } from '../styles/label-style'
import { HtmlElementBase } from './html-element'

export class HtmlText extends HtmlElementBase<HTMLSpanElement> {
  text: string
  style: TextStyle

  constructor (text: string, style: TextStyle) {
    super('span')

    this.text = text
    this.style = style
    text.indexOf('\n') >= 0 ? this.htmlElement.innerHTML = text.replaceAll('\n', '<br />') : this.htmlElement.textContent = text
    this.htmlElement.classList.add(this.id)
    this.applyStyle()
  }

  get width () {
    return this.htmlElement.getBoundingClientRect().width
  }

  get height () {
    return this.htmlElement.getBoundingClientRect().height
  }

  static create (text: string, style: TextStyle) {
    return new HtmlText(text, style)
  }

  private applyStyle () {
    if (this.htmlElement.style.position !== 'absolute') this.htmlElement.style.position = 'absolute'
    const color = this.style.color ? this.style.color.toString() : '#000'
    if (this.htmlElement.style.color !== color) this.htmlElement.style.color = color
    const fontSize = this.style.fontSize ? this.style.fontSize : '12px'
    if (this.htmlElement.style.fontSize !== fontSize) this.htmlElement.style.fontSize = fontSize
    const zIndex = this.order.toString()
    if (this.htmlElement.style.zIndex !== zIndex) this.htmlElement.style.zIndex = zIndex
  }

  protected update (): void {
    this.applyStyle()
  }
}
