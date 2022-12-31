import html from '../base/helper'

export class ToolbarButton {
  protected btn: HTMLDivElement | null = null
  name: string
  icon: string

  onClick: (() => void) | null = null

  constructor (name: string, icon: string) {
    this.name = name
    this.icon = icon
  }

  click () {
    this.btn?.click()
  }

  create (root: HTMLElement) {
    const wrapper = html.div('toolbar-button-wrapper')

    this.btn = html.div('toolbar-button')
    this.btn.className = 'toolbar-button'

    const i = document.createElement('i')
    i.className = 'fa fa-' + this.icon

    this.btn.addEventListener('click', () => { if (this.onClick) this.onClick() })
    this.btn.append(i)

    wrapper.append(this.btn)

    html.child(root, wrapper)
    return this
  }

  destroy () {
    if (this.btn) html.removeClick(this.btn)
  }
}

export class RadioToolbarButton extends ToolbarButton {
  private radioInput: HTMLInputElement | null = null
  groupName: string

  constructor (name: string, icon: string, groupName: string) {
    super(name, icon)
    this.groupName = groupName
  }

  click () {
    this.radioInput?.click()
  }

  create (root: HTMLElement) {
    const wrapper = html.div('toolbar-button-wrapper')

    const btn = html.div('toolbar-button')
    btn.className = 'toolbar-button'

    const i = document.createElement('i')
    i.className = 'fa fa-' + this.icon

    this.radioInput = document.createElement('input')
    this.radioInput.type = 'radio'
    this.radioInput.name = this.groupName
    this.radioInput.style.display = 'none'
    this.radioInput.value = this.name

    btn.addEventListener('click', () => this.radioInput?.click())

    btn.append(i)
    wrapper.append(this.radioInput)
    wrapper.append(btn)

    html.click(this.radioInput, () => { if (this.onClick) this.onClick() })

    html.child(root, wrapper)
    return this
  }

  destroy () {
    super.destroy()
    if (this.radioInput) html.removeClick(this.radioInput)
  }
}

export function createSeparator (root: HTMLElement) {
  html.child(root, html.div('toolbar-separator'))
}
