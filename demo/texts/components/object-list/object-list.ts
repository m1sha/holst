import { AppState } from '../../model/app-state'
import { Command } from '../../model/commands/command'
import { SelectEntitiesCommand } from '../../model/commands/select-entities-command'
import { Component } from '../base/component'
import { StateComponent } from '../base/state-component'

export type ObjectItemTemplate = (item: any, div: HTMLDivElement) => boolean

export class ObjectList extends StateComponent<HTMLDivElement> {
  filter: ((item: any) => boolean) | null = null
  title: ((item: any) => any) | null = null

  build () {
    if (!this.state.entities) return
    const root = this.rootElement
    root.innerHTML = ''

    for (const item of this.state.entities) {
      const div = document.createElement('div')
      const selected = item.target.id === this.state.selectedEntities[0]?.target.id
      div.className = selected ? 'object-list-item selected' : 'object-list-item'
      if (!this.filter || !this.filter(item)) continue
      root.append(div)
      const p = document.createElement('p')
      div.append(p)
      if (this.title) p.textContent = this.title(item)

      div.addEventListener('click', () => {
        this.send(new SelectEntitiesCommand([item.target.id], 'none'))
      })
    }
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    this.build()
  }

  protected get name (): string { return 'object-list' }
  protected get elementType (): string { return 'div' }
}
