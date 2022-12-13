import { Component } from '../base/component'
import { Panel } from './panel'

export class Grid extends Component<HTMLDivElement> {
  private panels: Panel[] = []
  protected get name (): string { return 'grid' }
  protected get elementType (): string { return 'div' }

  addPanels (...panelNames: Array<string | any>) {
    for (const panelName of panelNames) {
      if (typeof panelName === 'string') {
        this.panels.push(new Panel(panelName))
        continue
      }

      if (typeof panelName === 'object') {
        const keys = Object.keys(panelName)
        if (!keys.length) throw new Error('')
        const rootPanelName = keys[0]
        const items = panelName[rootPanelName]
        if (!Array.isArray(items)) throw new Error(rootPanelName + ' value must be array')

        const rootPanel = new Panel(rootPanelName)
        this.panels.push(rootPanel)
        for (const subPanelName of items) {
          if (typeof subPanelName === 'string') {
            const subPanel = new Panel(subPanelName)
            rootPanel.addPanel(subPanel)
          }
        }
      }
    }
  }

  appendToPanel (panelName: string, element: HTMLElement) {
    const panel = this.findPanel(panelName, this.panels)
    if (!panel) throw new Error('Panel ' + panelName + ' is not found')
    panel.addElement(element)
  }

  build () {
    for (const panel of this.panels) {
      panel.build()
      this.rootElement.append(panel.rootElement)
    }
  }

  private findPanel (panelName: string, panels: Panel[]): Panel | undefined {
    for (const panel of panels) {
      if (panel.panelName === panelName) {
        return panel
      }

      if (panel.panels) {
        const result = this.findPanel(panelName, panel.panels)
        if (result) return result
      }
    }
    return undefined
  }
}
