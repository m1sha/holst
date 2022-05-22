export class ActionSpecDic {
  private items: Record<string, boolean> = {}

  has (id: string) {
    return this.items[id]
  }

  set (id: string) {
    this.items[id] = true
  }

  clear (id: string) {
    delete this.items[id]
  }
}
