import { ICSSStyleDeclaration, IHTMLCanvasElement } from '../../src/core/render/html-canvas-element'

export class MockHTMLCanvasElement implements IHTMLCanvasElement {
  style: ICSSStyleDeclaration

  constructor () {
    this.style = { cursor: 'default' }
  }

  static create () {
    return new MockHTMLCanvasElement()
  }
}
