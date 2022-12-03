import { State } from '../../model/state'
import { Component } from '../base/component'

export type ObjectItemTemplate = (item: any, div: HTMLDivElement) => boolean

export class ObjectList extends Component<HTMLDivElement> {
  private state: State
  filter: ((item: any) => boolean) | null = null
  title: ((item: any) => any) | null = null

  constructor (state: State) {
    super()
    this.state = state
    this.state.addOnChange(() => this.build())
  }

  build () {
    if (!this.state.viewObjects) return
    const root = this.rootElement
    root.innerHTML = ''

    for (const item of this.state.viewObjects) {
      const div = document.createElement('div')
      const selected = item.object.id === this.state.selectedObject?.object.id
      div.className = selected ? 'object-list-item selected' : 'object-list-item'
      if (!this.filter || !this.filter(item)) continue
      root.append(div)
      const p = document.createElement('p')
      div.append(p)
      if (this.title) p.textContent = this.title(item)
      div.addEventListener('click', () => {
        this.state.selectedObject = item
        this.state.update()
      })
    }
  }

  private rebuild () {
    //
  }

  protected get name (): string { return 'object-list' }
  protected get elementType (): string { return 'div' }
}
