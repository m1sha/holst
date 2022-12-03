import { Rule } from './property-viewer'

export class PropertyViewerControl {
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
