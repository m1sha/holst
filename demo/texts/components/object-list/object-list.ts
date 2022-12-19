import { AppState } from '../../model/app-state'
import { Command } from '../../model/commands/command'
import { DeleteEntitiesCommand } from '../../model/commands/delete-entities-command'
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

      const icon = document.createElement('i')
      icon.className = item.target.type === 'text' ? 'fa fa-font' : 'fa fa-shapes'
      div.append(icon)

      const p = document.createElement('p')
      div.append(p)
      if (this.title) p.textContent = this.title(item)

      p.addEventListener('click', () => {
        this.send(new SelectEntitiesCommand([item.target.id], 'none'))
      })

      const ref = document.createElement('a')
      ref.href = 'javascript::void(0)'
      const icon2 = document.createElement('i')
      icon2.className = 'fa fa-trash'
      ref.append(icon2)
      ref.addEventListener('click', () => {
        this.send(new DeleteEntitiesCommand([item.target.id]))
        return false
      })

      div.append(ref)
    }
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    this.build()
  }

  protected get name (): string { return 'object-list' }
  protected get elementType (): string { return 'div' }
}
