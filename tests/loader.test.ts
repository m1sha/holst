import { ResourceLoader, ResourceLoaderCallBackFactory } from '../src/tools/resource-loader'
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

class Loader extends ResourceLoader<NewFoo> {
  #timeout: number = 0

  addTestValue (s: string, t: number) {
    this.#timeout = t
    this.add(s, '')
  }

  factory (): ResourceLoaderCallBackFactory<NewFoo> {
    return (url, callback) => NewFoo.createFoo(url, callback, this.#timeout)
  }
}

test('loader', async () => {
  const loader = new Loader()
  loader.addTestValue('a', 100)
  loader.addTestValue('b', 500)
  loader.addTestValue('c', 300)
  loader.addTestValue('d', 50)
  loader.addTestValue('e', 150)

  await loader.busy

  expect(loader.loadedCount).toBe(loader.count)
})

test('loader count 0', async () => {
  const loader = new Loader()

  await loader.busy

  expect(loader.loadedCount).toBe(0)
})
