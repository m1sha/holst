import { AppState } from '../../model/app-state'
import { Command } from '../../model/commands/command'
import { DeleteEntitiesCommand } from '../../model/commands/delete-entities-command'
import { SelectEntitiesCommand } from '../../model/commands/select-entities-command'
import { Component } from '../base/component'
import { StateComponent } from '../base/state-component'
import { EntityCard } from './entity-card'

export type ObjectItemTemplate = (item: any, div: HTMLDivElement) => boolean

export class ObjectList extends StateComponent<HTMLDivElement> {
  cards: EntityCard[] = []
  filter: ((item: any) => boolean) | null = null
  title: ((item: any) => any) | null = null

  build () {
    if (!this.state.entities) return
    const root = this.rootElement
    this.cards.forEach(card => card.destroy())
    this.cards = []
    root.innerHTML = ''

    for (const item of this.state.entities) {
      if (!this.filter || !this.filter(item)) continue
      const selected = item.target.id === this.state.selectedEntities[0]?.target.id

      const card = new EntityCard(item)
      if (this.title) card.title = this.title(item)
      card.onClick = () => this.send(new SelectEntitiesCommand([item.target.id], 'none'))
      card.onDeleteClick = () => this.send(new DeleteEntitiesCommand([item.target.id]))
      card.create(root, selected)
      this.cards.push(card)
    }
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    this.build()
  }

  protected get name (): string { return 'object-list' }
  protected get elementType (): string { return 'div' }
}
