import '../mock/mockDOMMatrix'
import { TextBlock } from '../../src/core/label'
import { measure } from '../mock/test-measure'

test('text is singleline', () => {
  const text = 'This is singleline text'
  const block = new TextBlock(text, { }, 0, measure)
  expect(false).toBe(block.multiline)
})

test('text is multiline', () => {
  const text = 'This is\n multiline text'
  const block = new TextBlock(text, { }, 0, measure)
  expect(true).toBe(block.multiline)
})

test('text is multiline 2', () => {
  const text = `This is multiline
  too`
  const block = new TextBlock(text, { }, 0, measure)
  expect(true).toBe(block.multiline)
})

test('text has 3 lines', () => {
  const text = 'This is line 1 \nThis is line Two\nThis is line III'
  const block = new TextBlock(text, { }, 0, measure)
  expect(3).toBe(block.lines.length)
})

test('text singleline width', () => {
  const text = 'This is line 1'
  const block = new TextBlock(text, { }, 0, measure)
  expect(text.length).toBe(block.width)
})

test('text multiline width', () => {
  const text = `This is line 1
This is line Two
This is line III
This is line Four`
  const block = new TextBlock(text, { }, 0, measure)
  expect(17).toBe(block.width)
})

test('text singleline height', () => {
  const text = 'This is line 1'
  const block = new TextBlock(text, { }, 0, measure)
  expect(1).toBe(block.height)
})

test('text multiline height', () => {
  const text = 'This is line 1 \nThis is line Two\nThis is line III'
  const block = new TextBlock(text, { }, 0, measure)
  expect(3).toBe(block.height)
})
