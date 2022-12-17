import { createTextBlockPropertyRules } from './text-block-property-rules'
import { Rules } from './property-rules'
import { createCategory, createCheckBox, createInput, createLabel, createRow, createSelect } from './property-viewer-control-builders'
import { PropertyViewerControl } from './property-viewer-control'
import { StateComponent } from '../base/state-component'
import { AppState } from '../../model/app-state'
import { Component } from '../base/component'
import { Command } from '../../model/commands/command'
import { SelectEntitiesCommand } from '../../model/commands/select-entities-command'
import { ChangeEntityValueCommand } from '../../model/commands/change-entity-value-command'

export type Rule = {
  title: string
  type: 'input' | 'select' | 'checkbox',
  dataType?: 'numeric' | 'color'
  options?: string[]
  value: () => string
  change: (value: unknown) => void,
  hidden: boolean
  categoryIndex: number
}

export class PropertyViewer extends StateComponent<HTMLDivElement> {
  private rules: Rules | null = null
  private controls: PropertyViewerControl[] = []

  setRules (rules: Rules) {
    this.rules = rules
    if (this.rules) this.rules.onUpdate = () => this.rebuild()
  }

  clearRules () {
    this.rules = null
  }

  build () {
    this.rootElement.innerHTML = ''
    let categoryIndex = -1

    for (const rule of this.rules?.toArray() ?? []) {
      if (rule.categoryIndex !== categoryIndex) {
        categoryIndex = rule.categoryIndex
        createCategory(categoryIndex, this.rootElement, this.rules!)
      }

      const div = createRow(this.rootElement)
      if (rule.hidden) div.style.display = 'none'

      const label = createLabel(rule, div)
      const control = new PropertyViewerControl(rule)
        .setContainer(div)
        .setLabel(label)

      if (rule.type === 'input') {
        const input = createInput(rule, div, value => this.send(new ChangeEntityValueCommand(value)))
        if (rule.dataType === 'numeric') input.type = 'number'
        if (rule.dataType === 'color') input.type = 'color'
        control.setInput(input)
      }

      if (rule.type === 'checkbox') {
        const input = createCheckBox(rule, div, value => this.send(new ChangeEntityValueCommand(value)))
        control.setInput(input)
      }

      if (rule.type === 'select' && rule.options) {
        const input = createSelect(rule, div, value => this.send(new ChangeEntityValueCommand(value)))
        control.setInput(input)
      }

      this.controls.push(control)
    }
  }

  private rebuild () {
    for (const control of this.controls) {
      control.update()
    }
  }

  protected onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (sender instanceof PropertyViewer) return
    if (!(command instanceof SelectEntitiesCommand)) return

    if (!this.state.selectedEntities) {
      this.clearRules()
      this.build()
      return
    }

    this.setRules(createTextBlockPropertyRules(this.state.selectedEntities[0] as any))
    this.build()
  }

  protected get name (): string { return 'property-viewer' }
  protected get elementType (): string { return 'div' }
}
