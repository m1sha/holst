import { Block } from './elements/block'

export class GarbageCollector {
  static collect (ids: number[], blocks: Block[]): void {
    const forDelete = []
    for (let i = 0; i < blocks.length; i++) {
      const uid = blocks[i]._uid
      if (ids.indexOf(uid) > -1) continue
      forDelete.push(i)
    }
    for (const index of forDelete) {
      blocks.splice(index, 1)
    }
  }
}
