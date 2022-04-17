function delay (timeout: number = 0, callback: () => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      try {
        callback()
        resolve()
      } catch (e) {
        reject(e)
      } finally {
        clearTimeout(timeoutId)
      }
    }, timeout)
  })
}

class NewFoo {
  name: string
  constructor (name: string) {
    this.name = name
  }

  static createFoo (name: string, callback: () => void, timeout: number): NewFoo {
    delay(timeout, callback)
    return new NewFoo(name)
  }
}

class Loader {
  #images: Record<string, NewFoo> = {}
  #loadedList: Record<number, boolean> = {}
  #resolve: null | (() => null) = null

  add (name: string, timeout: number) {
    const counter = this.count + 1
    this.#loadedList[counter] = false
    this.#images[name] = NewFoo.createFoo(name, () => {
      this.#loadedList[counter] = true
      this.checkFinish()
    }, timeout)
  }

  busy (): Promise<void> {
    return new Promise((resolve) => {
      this.#resolve = (resolve as unknown) as (() => null)
      this.checkFinish()
    })
  }

  checkFinish () {
    if (this.allLoaded() && this.#resolve) this.#resolve()
  }

  get count () {
    return Object.keys(this.#images).length
  }

  loadedCount (): number {
    return Object.values(this.#loadedList).filter(p => p).length
  }

  allLoaded () {
    return !Object.values(this.#loadedList).some(p => !p)
  }
}

test('loader', async () => {
  const loader = new Loader()
  loader.add('a', 100)
  loader.add('b', 500)
  loader.add('c', 300)
  loader.add('d', 50)
  loader.add('e', 150)

  await loader.busy()

  expect(loader.loadedCount()).toBe(5)
})

test('loader count 0', async () => {
  const loader = new Loader()

  await loader.busy()

  expect(loader.loadedCount()).toBe(0)
})
