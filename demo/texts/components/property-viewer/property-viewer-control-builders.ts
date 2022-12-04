import { Rules } from './property-rules'
import { Rule } from './property-viewer'

export function createCategory (categoryIndex: number, root: HTMLDivElement, rules: Rules) {
  const div = document.createElement('div')
  div.innerText = rules.categories[categoryIndex]
  div.className = 'property-rules-category'
  root.append(div)
}

export function createRow (root: HTMLDivElement) {
  const div = document.createElement('div')
  div.className = 'property-rule'
  root.append(div)
  return div
}

export function createLabel ({ title }: Rule, parentNode: HTMLDivElement) {
  const label = document.createElement('label')
  label.textContent = title
  parentNode.append(label)
  return label
}

export function createInput (rule: Rule, parentNode: HTMLDivElement) {
  const input = document.createElement('input')
  input.value = rule.value()
  input.onchange = e => {
    rule.change((e.target as HTMLInputElement).value)
  }
  parentNode.append(input)
  return input
}

export function createCheckBox (rule: Rule, parentNode: HTMLDivElement) {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.checked = Boolean(rule.value())
  input.onchange = e => {
    rule.change((e.target as HTMLInputElement).checked)
  }
  parentNode.append(input)
  return input
}

export function createSelect (rule: Rule, parentNode: HTMLDivElement) {
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
