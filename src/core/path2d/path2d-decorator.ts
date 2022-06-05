import { Mutable } from '../mutable'
import { Path2DElement } from './path2d-element'
type ElementType = Path2DElement['type']

export function createPath2ElementDecorator <T extends ElementType> (el: Path2DElement, index: number, mutable: Mutable) {
  (el as any).index = index
  const p = new Proxy(el, {
    get: (_: Path2DElement, p: string) => {
      return el[p as keyof typeof el]
    },
    set: (_: Path2DElement, p: string, value: any): boolean => {
      if (p in el) {
        el[p as keyof typeof el] = value
        mutable.setModified()
      }
      return true
    }
  })
  return p as Extract<Path2DElement & { index: number }, { type: T }>
}
