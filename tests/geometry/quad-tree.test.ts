import { Rect } from '../../src/core/geometry/rect'
import { QuadTree } from '../../src/core/geometry/quad-tree'
import { IPoint } from '../../src/core/geometry/point'

class Foo {
  id: string
  bounds: Rect

  constructor (id: string, bounds: Rect) {
    this.id = id
    this.bounds = bounds
  }

  isInPath (point: IPoint): boolean {
    return this.bounds.intersectsPoint(point)
  }
}

test('quad-tree', () => {
  const quadTree = new QuadTree(new Rect(0, 0, 100, 100))
  quadTree.maxCount = 5

  quadTree.addElement(new Foo('01', new Rect(0, 0, 10, 10)))
  quadTree.addElement(new Foo('01a', new Rect(1, 1, 10, 10)))
  quadTree.addElement(new Foo('01b', new Rect(2, 1, 10, 10)))
  quadTree.addElement(new Foo('01c', new Rect(1, 6, 10, 10)))
  quadTree.addElement(new Foo('01d', new Rect(1, 3, 10, 10)))
  quadTree.addElement(new Foo('01e', new Rect(2, 1, 10, 10)))
  quadTree.addElement(new Foo('02', new Rect(20, 20, 10, 10)))
  quadTree.addElement(new Foo('03', new Rect(21, 21, 10, 10)))
  quadTree.addElement(new Foo('04', new Rect(24, 26, 10, 10)))
  quadTree.addElement(new Foo('05', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('06', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('07', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('08', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('09', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('10', new Rect(31, 21, 10, 10)))

  quadTree.addElement(new Foo('11', new Rect(50, 0, 10, 10)))
  quadTree.addElement(new Foo('12', new Rect(20, 20, 10, 10)))
  quadTree.addElement(new Foo('13', new Rect(21, 21, 10, 10)))
  quadTree.addElement(new Foo('14', new Rect(24, 26, 10, 10)))
  quadTree.addElement(new Foo('15', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('16', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('17', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('18', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('19', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('20', new Rect(31, 21, 10, 10)))
  quadTree.addElement(new Foo('20', new Rect(81, 81, 10, 10)))

  const elems = quadTree.getElementsByPoint({ x: 5, y: 5 })
  expect(elems.length).toBe(quadTree.maxCount)
  expect(quadTree.getElementsByPoint({ x: 85, y: 85 }).length).toBe(1)
})

test('quad-tree remove', () => {
  const quadTree = new QuadTree(new Rect(0, 0, 100, 100))
  quadTree.maxCount = 5

  const foo0 = new Foo('20', new Rect(31, 21, 10, 10))
  quadTree.addElement(foo0)
  const foo1 = new Foo('21', new Rect(32, 21, 10, 10))
  quadTree.addElement(foo1)

  expect(quadTree.count).toBe(2)

  quadTree.removeElement(foo0)
  expect(quadTree.count).toBe(1)

  quadTree.removeElement(foo1)
  expect(quadTree.count).toBe(0)
})

test('quad-tree remove many', () => {
  const quadTree = new QuadTree(new Rect(0, 0, 100, 100))
  quadTree.maxCount = 4

  const foos = [
    new Foo('20', new Rect(31, 21, 10, 10)),
    new Foo('21', new Rect(32, 21, 10, 10)),
    new Foo('22', new Rect(31, 11, 10, 10)),
    new Foo('23', new Rect(52, 21, 10, 10)),
    new Foo('30', new Rect(31, 41, 10, 10)),
    new Foo('31', new Rect(32, 51, 10, 10)),
    new Foo('32', new Rect(31, 61, 10, 10)),
    new Foo('33', new Rect(62, 21, 10, 10)),
    new Foo('40', new Rect(31, 21, 10, 10)),
    new Foo('41', new Rect(32, 2, 10, 10)),
    new Foo('42', new Rect(31, 22, 10, 70)),
    new Foo('43', new Rect(32, 21, 10, 80)),
    new Foo('50', new Rect(31, 21, 10, 100)),
    new Foo('51', new Rect(32, 2, 10, 10)),
    new Foo('52', new Rect(31, 22, 10, 20)),
    new Foo('53', new Rect(32, 31, 20, 10))
  ]

  foos.forEach(p => quadTree.addElement(p))

  expect(quadTree.count).toBe(16)

  foos.forEach(p => quadTree.removeElement(p))

  expect(quadTree.count).toBe(0)
})
