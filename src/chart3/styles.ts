import { TextStyle } from '../core/label-style'
import { ShapeStyle } from '../core/shape-style'
export default class {
  static graphLine: ShapeStyle = {
    strokeStyle: '#028f5f',
    lineWidth: 3,
    lineJoin: 'bevel'
  }

  static axises: ShapeStyle = {
    strokeStyle: 'rgba(11,11,11,1)'
  }

  static segments: ShapeStyle = {
    strokeStyle: 'rgba(228,228,228,1)'
  }

  static axisText: TextStyle = {
    color: '#222222',
    fontSize: '12px',
    fontName: 'Arial'
  }
}
