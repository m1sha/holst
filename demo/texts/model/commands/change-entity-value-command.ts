import { Rule } from '../../components/property-viewer/property-viewer'
import { MutableAppState } from '../app-state'
import { Command } from './command'

export class EntityValue {
  value: any
  type: any

  constructor (value: any, type: any) {
    this.value = value
    this.type = type
  }
}

export class ChangeEntityValueCommand extends Command<EntityValue> {
  private rule: Rule
  private previousValue: any = null
  private element: HTMLElement

  constructor (value: EntityValue, rule: Rule, element: HTMLElement) {
    super()
    this.data = value
    this.rule = rule
    this.element = element
  }

  execute (appState: MutableAppState): void {
    this.previousValue = this.rule.value()
    this.rule.change(this.data!.value)
    super.execute(appState)
  }

  rollback (appState: MutableAppState): void {
    this.rule.change(this.previousValue)

    if (this.element.tagName.toLowerCase() === 'input') {
      const el = this.element as HTMLInputElement
      if (el.type === 'checkbox') {
        el.checked = Boolean(this.previousValue)
      } else el.value = this.previousValue
    }

    if (this.element.tagName.toLowerCase() === 'select') {
      const el = this.element as HTMLSelectElement
      el.selectedIndex = this.rule.options!.indexOf(this.previousValue)
      el.value = this.previousValue
    }

    super.rollback(appState)
  }
}
