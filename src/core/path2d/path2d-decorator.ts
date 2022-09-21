import { Mutable } from '../mutable'
import { Path2DElement } from './path2d-element'
type ElementType = Path2DElement['type']
export type ProxyPath2DElement<T extends ElementType> = Extract<Path2DElement & { index: number }, { type: T }>

export function createPath2ElementDecorator <T extends ElementType> (el: Path2DElement, index: number, mutable: Mutable) {
  (el as any).index = index
  const p = new Proxy(el, {
    get: (path2d: Path2DElement, p: string) => {
      return path2d[p as keyof typeof path2d]
    },
    set: (path2d: Path2DElement, p: string, value: any): boolean => {
      if (p in el) {
        path2d[p as keyof typeof path2d] = value
        mutable.setModified()
      }
      return true
    }
  })
  return p as ProxyPath2DElement<T>
}
