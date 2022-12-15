import { StateComponent } from '../base/state-component'

export class Toolbar extends StateComponent<HTMLDivElement> {
  protected get name (): string { return 'toolbar' }
  protected get elementType (): string { return 'div' }

  build () {
    const root = this.rootElement

    const createTextBtn = this.createButton('font')
    const createShapesBtn = this.createButton('shapes')
    const selectBtn = this.createButton('mouse-pointer')

    root.append(createTextBtn)
    root.append(createShapesBtn)
    root.append(selectBtn)
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
