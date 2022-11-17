import { TextStyle } from '../../src/core/styles/label-style'

const measure = (text: string, style: TextStyle) => {
  return {
    width: text.length,
    actualBoundingBoxAscent: 0.5,
    actualBoundingBoxDescent: 0.5
  }
}

export { measure }
