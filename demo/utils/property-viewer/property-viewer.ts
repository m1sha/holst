import { Rules } from './prorerty-rules'

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

class PropertyViewerControl {
  private htmlInput: HTMLInputElement | HTMLSelectElement | null = null
  private htmlLabel: HTMLLabelElement | null = null
  private htmlContainer: HTMLDivElement | null = null
  readonly rule: Rule
  constructor (rule: Rule) {
    this.rule = rule
  }

  setInput (control: HTMLInputElement | HTMLSelectElement) {
    this.htmlInput = control
    return this
  }

  setLabel (label: HTMLLabelElement) {
    this.htmlLabel = label
    return this
  }

  setContainer (container: HTMLDivElement) {
    this.htmlContainer = container
    return this
  }

  update () {
    this.htmlContainer!.style.display = this.rule.hidden ? 'none' : 'flex'
  }
}

export class PropertyViewer {
  private rules: Rules | null = null
  private controls: PropertyViewerControl[] = []

  setRules (rules: Rules) {
    this.rules = rules
    if (this.rules) this.rules.onUpdate = () => this.rebuild()
  }

  build (root: HTMLDivElement) {
    root.innerHTML = ''
    let categoryIndex = -1
    for (const rule of this.rules?.toArray() ?? []) {
      if (rule.categoryIndex !== categoryIndex) {
        categoryIndex = rule.categoryIndex
        this.createCategory(categoryIndex, root)
      }

      const div = this.createRow(root)
      if (rule.hidden) div.style.display = 'none'

      const label = this.createLabel(rule, div)
      const control = new PropertyViewerControl(rule)
        .setContainer(div)
        .setLabel(label)

      if (rule.type === 'input') {
        const input = this.createInput(rule, div)
        if (rule.dataType === 'numeric') input.type = 'number'
        if (rule.dataType === 'color') input.type = 'color'
        control.setInput(input)
      }

      if (rule.type === 'checkbox') {
        const input = this.createCheckBox(rule, div)
        control.setInput(input)
      }

      if (rule.type === 'select' && rule.options) {
        const input = this.createSelect(rule, div)
        control.setInput(input)
      }

      this.controls.push(control)
    }
  }

  rebuild () {
    for (const control of this.controls) {
      control.update()
    }
  }

  private createCategory (categoryIndex: number, root: HTMLDivElement) {
    const div = document.createElement('div')
    div.innerText = this.rules!.categories[categoryIndex]
    div.className = 'property-rules-category'
    root.append(div)
  }

  private createRow (root: HTMLDivElement) {
    const div = document.createElement('div')
    div.className = 'property-rule'
    root.append(div)
    return div
  }

  private createLabel ({ title }: Rule, parentNode: HTMLDivElement) {
    const label = document.createElement('label')
    label.textContent = title
    parentNode.append(label)
    return label
  }

  private createInput (rule: Rule, parentNode: HTMLDivElement) {
    const input = document.createElement('input')
    input.value = rule.value()
    input.onchange = e => {
      rule.change((e.target as HTMLInputElement).value)
    }
    parentNode.append(input)
    return input
  }

  private createCheckBox (rule: Rule, parentNode: HTMLDivElement) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = Boolean(rule.value())
    input.onchange = e => {
      rule.change((e.target as HTMLInputElement).checked)
    }
    parentNode.append(input)
    return input
  }

  private createSelect (rule: Rule, parentNode: HTMLDivElement) {
    const select = document.createElement('select')
    for (const opt of rule.options!) {
      const option = document.createElement('option')
      option.text = opt
      option.value = opt
      select.append(option)
    }
    select.selectedIndex = rule.options!.indexOf(rule.value())
    select.onchange = e => {
      rule.change((e.target as HTMLSelectElement).value)
    }
    parentNode.append(select)
    return select
  }
}
