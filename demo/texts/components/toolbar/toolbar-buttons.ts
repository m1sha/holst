import html from '../base/helper'

export class ToolbarButton {
  protected element: HTMLDivElement | null = null
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
    this.element = html.div('toolbar-button-wrapper')

    this.btn = html.div('toolbar-button')
    this.btn.className = 'toolbar-button'

    const i = document.createElement('i')
    i.className = 'fa fa-' + this.icon

    this.btn.addEventListener('click', () => { if (this.onClick) this.onClick() })
    this.btn.append(i)

    this.element.append(this.btn)

    html.child(root, this.element)
    return this
  }

  destroy () {
    if (this.btn) html.removeClick(this.btn)
  }

  title (title: string) {
    if (this.element) this.element.title = title
    return this
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

  setCheck (value: boolean) {
    this.radioInput!.checked = value
  }

  create (root: HTMLElement) {
    this.element = html.div('toolbar-button-wrapper')

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
    this.element.append(this.radioInput)
    this.element.append(btn)

    html.click(this.radioInput, () => { if (this.onClick) this.onClick() })

    html.child(root, this.element)
    return this
  }

  visible (value: boolean) {
    this.element!.style.display = value ? 'block' : 'none'
    // this.element!.style.opacity = value ? '1' : '0'
  }

  destroy () {
    super.destroy()
    if (this.radioInput) html.removeClick(this.radioInput)
  }
}

export function createSeparator (root: HTMLElement) {
  html.child(root, html.div('toolbar-separator'))
}

export class ToolbarButtons {
  private root: HTMLElement
  private buttons: ToolbarButton[] = []

  constructor (root: HTMLElement) {
    this.root = root
  }

  createButton (name: string, icon: string) {
    const result = new ToolbarButton(name, icon).create(this.root)
    this.buttons.push(result)
    return result
  }

  createRadio (name: string, icon: string, groupName: string) {
    const result = new RadioToolbarButton(name, icon, groupName).create(this.root)
    this.buttons.push(result)
    return result
  }

  setCheck (name: string, value: boolean) {
    const btn = this.buttons.find(p => p.name === name) as RadioToolbarButton
    if (btn) btn.setCheck(value)
  }

  click (name: string) {
    const btn = this.buttons.find(p => p.name === name) as RadioToolbarButton
    if (btn) btn.click()
  }

  visibleRadioGroup (groupName: string, value: boolean) {
    this.buttons.forEach(p => {
      if (p instanceof RadioToolbarButton && p.groupName === groupName) p.visible(value)
    })
  }

  destroy () {
    this.buttons.forEach(p => p.destroy())
    this.buttons = []
  }
}
