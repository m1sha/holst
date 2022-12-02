import { getValue, setValue } from '../reflection'
import { Rule } from './property-viewer'

export class Rules {
  readonly categories: string[] = []
  readonly rules: Rule[] = []
  object: any = null
  onUpdate: (() => void) | null = null

  constructor (object: any) {
    this.object = object
  }

  category (title: string) {
    this.categories.push(title)
    return this
  }

  number (title: string, field: string, categoryIndex?: number, hidden?: boolean): this {
    this.rules.push(inputNumber(title, this.object, field, categoryIndex, hidden))
    return this
  }

  string (title: string, field: string, categoryIndex?: number, hidden?: boolean): this {
    this.rules.push(inputString(title, this.object, field, categoryIndex, hidden))
    return this
  }

  color (title: string, field: string, categoryIndex?: number, hidden?: boolean): this {
    this.rules.push(inputColor(title, this.object, field, categoryIndex, hidden))
    return this
  }

  bool (title: string, field: string, categoryIndex?: number, hidden?: boolean): this {
    this.rules.push(inputBool(title, this.object, field, categoryIndex, hidden))
    return this
  }

  select (title: string, field: string, options: string[], categoryIndex?: number, hidden?: boolean): this {
    this.rules.push(select(title, this.object, field, options, categoryIndex, hidden))
    return this
  }

  custom (title: string, type: 'input' | 'checkbox', get: ((sender: Rules) => any) | string, set: (sender: Rules, v: any) => void, categoryIndex: number, hidden: boolean) {
    this.rules.push({
      title,
      type,
      value: () => typeof get === 'string' ? getValue(this.object, get) : get(this),
      change: v => {
        set(this, v)
        if (this.onUpdate) this.onUpdate()
      },
      hidden,
      categoryIndex: categoryIndex ?? 0
    })
    return this
  }

  getRule (title: string) {
    return this.rules.find(p => p.title === title)
  }

  toArray () {
    return this.rules
  }
}

function inputNumber (title: string, obj: any, field: string, categoryIndex?: number, hidden?: boolean): Rule {
  return {
    title,
    type: 'input',
    value: () => getValue(obj, field),
    dataType: 'numeric',
    change: e => setValue(obj, field, Number(e)),
    hidden: hidden ?? false,
    categoryIndex: categoryIndex ?? 0
  }
}

function inputString (title: string, obj: any, field: string, categoryIndex?: number, hidden?: boolean): Rule {
  return {
    title,
    type: 'input',
    value: () => getValue(obj, field),
    change: e => setValue(obj, field, e),
    hidden: hidden ?? false,
    categoryIndex: categoryIndex ?? 0
  }
}

function inputColor (title: string, obj: any, field: string, categoryIndex?: number, hidden?: boolean): Rule {
  return {
    title,
    type: 'input',
    value: () => getValue(obj, field),
    dataType: 'color',
    change: e => setValue(obj, field, e),
    hidden: hidden ?? false,
    categoryIndex: categoryIndex ?? 0
  }
}

function inputBool (title: string, obj: any, field: string, categoryIndex?: number, hidden?: boolean): Rule {
  return {
    title,
    type: 'checkbox',
    value: () => getValue(obj, field),
    dataType: 'numeric',
    change: e => setValue(obj, field, Number(e)),
    hidden: hidden ?? false,
    categoryIndex: categoryIndex ?? 0
  }
}

function select (title: string, obj: any, field: string, options: string[], categoryIndex?: number, hidden?: boolean): Rule {
  return {
    title,
    type: 'select',
    value: () => getValue(obj, field),
    options: options,
    change: e => setValue(obj, field, e),
    hidden: hidden ?? false,
    categoryIndex: categoryIndex ?? 0
  }
}
