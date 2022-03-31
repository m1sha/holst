import Orderable from './orderable'

export function sort (objects: Orderable[]): Orderable[] {
  return objects.sort((a, b) => a.order - b.order)
}
