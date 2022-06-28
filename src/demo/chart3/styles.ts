import { TextStyle } from '../../core/label-style'
import { ShapeStyle } from '../../core/shape-style'
export default class {
  static graphLine: ShapeStyle = {
    stroke: '#028f5f',
    lineWidth: 3,
    lineJoin: 'bevel'
  }

  static axises: ShapeStyle = {
    stroke: 'rgba(11,11,11,1)'
  }

  static segments: ShapeStyle = {
    stroke: 'rgba(228,228,228,1)'
  }

  static axisText: TextStyle = {
    color: '#222222',
    fontSize: '12px',
    fontName: 'Arial'
  }

  static chartNameText: TextStyle = {
    color: '#222222',
    fontSize: '14px',
    fontName: 'Arial'
  }
}
