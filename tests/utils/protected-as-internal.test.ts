import { internal } from '../../src/utils/internal'

interface IFoo {
  bar (): string
}

class Foo {
  protected bar () {
    return 'bazz'
  }
}

test('protected-as-internal', () => {
  const foo = internal<IFoo>(new Foo())
  expect(foo.bar()).toBe('bazz')
})
