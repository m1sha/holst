import { StateComponent } from '../base/state-component'

export class Toolbar extends StateComponent<HTMLDivElement> {
  protected get name (): string { return 'toolbar' }
  protected get elementType (): string { return 'div' }

  build () {
    const root = this.rootElement

    root.append(this.createButton('font'))
    root.append(this.createButton('shapes'))
    root.append(this.createButton('mouse-pointer'))
  }

  private createButton (icon: string) {
    const btn = document.createElement('button')
    btn.className = 'btn btn-secondary outline'
    const i = document.createElement('i')
    i.className = 'fa fa-' + icon
    btn.append(i)
    return btn
  }
}
