import { createTextBlockPropertyRules } from './text-block-property-rules'
import { State } from '../../model/state'
import { Rules } from './property-rules'
import { Component } from '../base/component'
import { createCategory, createCheckBox, createInput, createLabel, createRow, createSelect } from './property-viewer-control-builders'
import { PropertyViewerControl } from './property-viewer-control'

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

export class PropertyViewer extends Component<HTMLDivElement> {
  private rules: Rules | null = null
  private controls: PropertyViewerControl[] = []

  constructor (state: State) {
    super(state)
    this.state.addOnChange(() => {
      if (!this.state.selectedObject) {
        this.clearRules()
        this.build()
        return
      }

      this.setRules(createTextBlockPropertyRules(this.state.selectedObject))
      this.build()
      // this.rebuild()
    })
  }

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
        const input = createInput(rule, div)
        if (rule.dataType === 'numeric') input.type = 'number'
        if (rule.dataType === 'color') input.type = 'color'
        control.setInput(input)
      }

      if (rule.type === 'checkbox') {
        const input = createCheckBox(rule, div)
        control.setInput(input)
      }

      if (rule.type === 'select' && rule.options) {
        const input = createSelect(rule, div)
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

  protected get name (): string { return 'property-viewer' }
  protected get elementType (): string { return 'div' }
}
