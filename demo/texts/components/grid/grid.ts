import { Component } from '../base/component'
import { Panel } from './panel'

export type AppMap = any
export class Grid extends Component<HTMLDivElement> {
  private panels: Panel[] = []
  protected get name (): string { return 'grid' }
  protected get elementType (): string { return 'div' }

  add (appMap: AppMap) {
    this.addPanel(appMap, this.panels)
  }

  build () {
    for (const panel of this.panels) {
      panel.build()
      this.rootElement.append(panel.rootElement)
    }
  }

  private addPanel (obj: any, parents: Panel[]) {
    const keys = Object.keys(obj)
    for (const key of keys) {
      const value = obj[key]
      const panel = new Panel(key)
      parents.push(panel)

      if (value instanceof Component) {
        panel.addElement(value.rootElement)
        continue
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          if (item instanceof Component) panel.addElement(item.rootElement)
        }
        continue
      }

      this.addPanel(value, panel.panels)
    }
  }
}
