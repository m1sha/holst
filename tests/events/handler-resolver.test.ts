import { HandlerResolver } from '../../src/core/events/handler-resolver'
import { MockHTMLCanvasElement } from '../mock/mock-html-canvas-element'
import { FooInteractive } from './foo/foo-interactive'
import { createMouseEvent } from './mouse-event'

test('Handler resolver test', () => {
  const obj0 = new FooInteractive('Obj0', 1, 'A')
  const obj1 = new FooInteractive('Obj1', 2, 'A')
  expect(obj0.data).toBe('A')
  expect(obj1.data).toBe('A')

  const resolver = new HandlerResolver(MockHTMLCanvasElement.create(), {
    click: [{
      interactive: obj0,
      listener: () => { obj0.data = 'B' }
    },
    {
      interactive: obj1,
      listener: () => { obj1.data = 'C' }
    }],
    mousemove: []
  })
  resolver.onclick(createMouseEvent() as any)
  expect(obj0.data).toBe('B')
  expect(obj1.data).toBe('C')
})

test('Handler resolver test stopPropagation', () => {
  const obj0 = new FooInteractive('Obj0', 1, 'A')
  const obj1 = new FooInteractive('Obj1', 2, 'A')
  expect(obj0.data).toBe('A')
  expect(obj1.data).toBe('A')

  const resolver = new HandlerResolver(MockHTMLCanvasElement.create(), {
    click: [
      { interactive: obj0, listener: e => { obj0.data = 'B'; e.event.stopPropagation() } },
      { interactive: obj1, listener: e => { obj1.data = 'C'; e.event.stopPropagation() } }
    ],
    mousemove: []
  })
  for (let i = 0; i < 10; i++) resolver.onclick(createMouseEvent() as any)

  expect(obj0.data).toBe('A')
  expect(obj1.data).toBe('C')
})

test('Handler resolver test onmousemove stopPropagation', () => {
  const obj0 = new FooInteractive('Obj0', 1, 'A')
  const obj1 = new FooInteractive('Obj1', 2, 'A')
  expect(obj0.data).toBe('A')
  expect(obj1.data).toBe('A')
  let move = false

  const resolver = new HandlerResolver(MockHTMLCanvasElement.create(), {
    leave: [
      { interactive: obj0, listener: e => { obj0.data = 'A'; e.event.stopPropagation() } },
      { interactive: obj1, listener: e => { obj1.data = 'A'; e.event.stopPropagation() } }
    ],
    hover: [
      { interactive: obj0, listener: e => { obj0.data = 'B'; e.event.stopPropagation() } },
      { interactive: obj1, listener: e => { obj1.data = 'C'; e.event.stopPropagation() } }
    ],
    mousemove: [
      { interactive: obj0, listener: e => { e.event.stopPropagation() } },
      { interactive: obj1, listener: e => { move = true; e.event.stopPropagation() } }
    ]
  })

  for (let i = 0; i < 2; i++) resolver.onmousemove(createMouseEvent() as any)

  expect(obj0.data).toBe('A')
  expect(obj1.data).toBe('C')
  expect(move).toBeTruthy()
})
