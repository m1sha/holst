import { Image, Images } from './image'
import { TextBlock } from './label'
import { TextStyle } from './label-style'
import { Point } from './point'
import { Rect } from './rect'
import Shape from './shape'
import { ShapeStyle } from './shape-style'
import { TextMeasurer } from './text-measurer'
import { MutablePath2D } from './path2d/mutable-path2d'
import { StyleManager } from './style-manager'
import { calcBounds } from './utils'
import Orderable from './orderable'

export class Layer implements Orderable {
  private orderCounter: number = 0
  private styleManager: StyleManager
  private _shapes: Shape[] = []
  textBlocks: TextBlock[] = []
  images: Images = []
  mask: Shape | null
  order: number
  name: string

  constructor (order: number, styleManager: StyleManager, name?: string) {
    this.name = name || 'Layer' + order
    this.order = order
    this.mask = null
    this.styleManager = styleManager
    this.clear()
  }

  get bounds (): Readonly<Rect> {
    const points: Point[] = []
    for (const rect of this._shapes.map(p => p.bounds)) points.push(...rect.points)
    return calcBounds(points)
  }

  createShape (style: ShapeStyle | string | null = null, path?: MutablePath2D): Shape {
    const stl = (typeof style === 'string') ? this.styleManager.shapes(style) : style
    if (!path) path = new MutablePath2D()
    const result = new Shape(path, ++this.orderCounter, stl)
    this._shapes.push(result)
    return result
  }

  createTextBlock (text: string, style: TextStyle | string, target?: Point): TextBlock {
    const stl = (typeof style === 'string') ? this.styleManager.texts(style) : style
    const result = new TextBlock(text, stl, ++this.orderCounter, (text, style) => this.measureText(text, stl))
    if (target) result.target = target
    this.textBlocks.push(result)
    return result
  }

  addShape (shape: Shape): void {
    if (!shape.order) shape.order = ++this.orderCounter
    this._shapes.push(shape)
  }

  createImage (img: Image) {
    this.images.push(img)
  }

  clear () {
    this.orderCounter = 0
    this.textBlocks = []
    this._shapes = []
    this.images = []
  }

  measureText (text: string, style: TextStyle) { return TextMeasurer.measureText(text, style) }

  createMask (defaultRect?: boolean): Shape {
    this.mask = this.createShape()
    if (defaultRect || defaultRect === undefined) {
      this.mask.rect(this.bounds)
    }
    return this.mask
  }

  removeMask (): void {
    this.mask = null
  }

  get shapes (): Shape[] {
    return this._shapes
  }
}
