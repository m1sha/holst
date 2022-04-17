import { Bitmap } from './bitmap'

export class Assets {
  #images: Record<string, Bitmap> = {}
  #loadedList: Record<number, boolean> = {}
  #resolve: null | (() => null) = null
  #reject: null | ((reason?: any) => void) = null

  onLoading?: (count: number) => void
  onLoad?: () => void

  add (name: string, url: string) {
    const counter = this.count + 1
    this.#loadedList[counter] = false
    this.#images[name] = Bitmap.createImage(url, () => {
      this.#loadedList[counter] = true
      this.#checkFinish()
    }, e => this.#reject && this.#reject(e))
  }

  get (name: string) {
    return this.#images[name]
  }

  get names () {
    return Object.keys(this.#images)
  }

  get count () {
    return this.names.length
  }

  get busy (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.#resolve = (resolve as unknown) as (() => null)
      this.#reject = reject
      if (this.#allLoaded()) resolve()
    })
  }

  #checkFinish () {
    if (this.#allLoaded() && this.#resolve) {
      this.#resolve()
      if (this.onLoad) this.onLoad()
      return
    }
    if (this.onLoading) this.onLoading(this.#loadedCount())
  }

  #allLoaded () {
    return !Object.values(this.#loadedList).some(p => !p)
  }

  #loadedCount (): number {
    return Object.values(this.#loadedList).filter(p => p).length
  }
}
