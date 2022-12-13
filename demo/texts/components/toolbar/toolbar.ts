import { StateComponent } from '../base/state-component'

export class Toolbar extends StateComponent<HTMLDivElement> {
  protected get name (): string { return 'toolbar' }
  protected get elementType (): string { return 'div' }

  build () {
    const root = this.rootElement
    const el = document.createElement('button')
    el.textContent = 'Create'
    root.append(el)
    const el2 = document.createElement('button')
    el2.textContent = 'Move'
    root.append(el2)
  }
}
