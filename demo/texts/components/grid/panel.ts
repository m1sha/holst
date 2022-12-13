import { Component } from '../base/component'

export class Panel extends Component<HTMLDivElement> {
  readonly panels: Panel[] = []
  private elements: HTMLElement[] = []
  protected get name (): string { return 'panel' }
  protected get elementType (): string { return 'div' }
  panelName: string

  constructor (name: string) {
    super()
    this.panelName = name
  }

  addPanel (panel: Panel) {
    this.panels.push(panel)
  }

  addElement (elem: HTMLElement) {
    this.elements.push(elem)
  }

  build () {
    for (const element of this.elements) {
      this.rootElement.append(element)
    }

    for (const panel of this.panels) {
      panel.build()
      this.rootElement.append(panel.rootElement)
    }
  }

  protected onElementSetting (element: HTMLDivElement) {
    element.className = this.panelName + '-' + this.name
  }
}
