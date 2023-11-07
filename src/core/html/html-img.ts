import { HtmlElementBase } from './html-element'

export class HtmlImg extends HtmlElementBase<HTMLImageElement> {
  // src: string

  constructor (src: string) {
    super('img')

    this.htmlElement.src = src
  }

  protected update (): void {}
}
