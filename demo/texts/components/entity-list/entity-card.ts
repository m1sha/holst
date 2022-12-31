import { Drawable } from '../../../../src/core/drawable'
import { Entity } from '../../model/entities/entity'
import html from '../base/helper'

export class EntityCard {
  private cardTitle: HTMLElement | null = null
  private deleteButton: HTMLElement | null = null
  private entity: Entity<Drawable>
  title: string = ''
  onClick: (() => void) | null = null
  onDeleteClick: (() => void) | null = null
  onVisibleClick: ((value: boolean) => void) | null = null

  constructor (entity: Entity<Drawable>) {
    this.entity = entity
  }

  create (listDiv: HTMLDivElement, selected: boolean) {
    const cardDiv = html.div(selected ? 'object-list-item selected' : 'object-list-item')
    html.child(listDiv, cardDiv)

    const drawableTypeIcon = html.i(this.entity.target.type === 'text' ? 'fa fa-font' : 'fa fa-shapes')
    html.child(cardDiv, drawableTypeIcon)

    const cardTitle = html.p(this.title)
    html.child(cardDiv, cardTitle)
    html.click(cardTitle, () => { if (this.onClick) this.onClick() })

    const visibleButton = html.a()
    const visibleIcon = html.i(!this.entity.target.hidden ? 'fa fa-eye' : 'fa fa-eye-slash')
    html.child(visibleButton, visibleIcon)
    html.child(cardDiv, visibleButton)
    html.click(visibleButton, () => {
      if (this.onVisibleClick) this.onVisibleClick(this.entity.target.hidden)
    })

    const deleteButton = html.a()
    const deleteIcon = html.i('fa fa-trash')
    html.child(deleteButton, deleteIcon)
    html.child(cardDiv, deleteButton)
    html.click(deleteButton, () => { if (this.onDeleteClick) this.onDeleteClick() })
  }

  destroy () {
    if (this.cardTitle) html.removeClick(this.cardTitle)
    if (this.deleteButton) html.removeClick(this.deleteButton)
  }
}
