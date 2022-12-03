import { State } from '../../model/state'

export type ObjectItemTemplate = (item: any, div: HTMLDivElement) => boolean

export class ObjectList {
  private state: State
  #rootElement: HTMLDivElement | null = null
  filter: ((item: any) => boolean) | null = null
  title: ((item: any) => any) | null = null

  constructor (state: State) {
    this.state = state
    this.state.addOnChange(() => this.build())
  }

  get rootElement (): HTMLDivElement {
    if (!this.#rootElement) {
      this.#rootElement = document.createElement('div')
      this.#rootElement.className = 'object-list'
    }
    return this.#rootElement
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
}
