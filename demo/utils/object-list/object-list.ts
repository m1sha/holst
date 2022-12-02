import { State } from '../state/state'

export type ObjectItemTemplate = (item: any, div: HTMLDivElement) => boolean

export class ObjectList {
  private state: State
  #rootElement: HTMLDivElement | null = null
  #array: any[] = []
  filter: ((item: any) => boolean) | null = null
  title: ((item: any) => any) | null = null

  constructor (state: State) {
    this.state = state
    this.state.addOnChange(() => {
      this.build()
    })
  }

  get rootElement (): HTMLDivElement {
    if (!this.#rootElement) {
      this.#rootElement = document.createElement('div')
      this.#rootElement.className = 'object-list'
    }
    return this.#rootElement
  }

  setItems (array: any[]) {
    this.#array = array
  }

  build () {
    if (!this.#array) return
    const root = this.rootElement
    root.innerHTML = ''

    for (const item of this.#array) {
      const div = document.createElement('div')
      const selected = item.id === this.state.selectedObject?.id
      div.className = selected ? 'object-list-item selected' : 'object-list-item'
      if (!this.filter || !this.filter(item)) continue
      root.append(div)
      const p = document.createElement('p')
      div.append(p)
      if (this.title) p.textContent = this.title(item)
    }
  }

  private rebuild () {
    //
  }
}
