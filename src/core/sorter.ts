import Orderable from './orderable'

export function sort<T extends Orderable> (objects: Orderable[]): T[] {
  return objects.sort((a, b) => a.order - b.order) as T[]
}
