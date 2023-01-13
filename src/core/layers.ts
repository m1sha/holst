import { Raster } from './raster'
import { TextBlock } from './label'
import { TextStyle } from './styles/label-style'
import { Point, IPoint } from './geometry/point'
import { Rect } from './geometry/rect'
import Shape from './shape'
import { ShapeStyle } from './styles/shape-style'
import { MutablePath2D } from './path2d/mutable-path2d'
import { StyleManager } from './styles/style-manager'
import Orderable from './orderable'
import { Arrange } from './arrange'
import { Sprite } from './sprite'
import { Matrix2D } from './matrix'
import { removeItem } from '../utils/array'
import { calcBounds } from '../utils/utils'
import { Shape2 } from './shape2'
import { Group } from './group'
export class Layer implements Orderable {
  private objects: Orderable[] = []
  readonly styleManager: StyleManager
  private arrange: Arrange
  mask: Shape | null
  order: number
  name: string
  frozen: boolean = false
  globalTransform: Matrix2D | null = null
  canvasOrder: 'foreground' | 'background' = 'foreground'

  constructor (order: number, styleManager: StyleManager, name?: string) {
    this.name = name || 'Layer' + order
    this.order = order
    this.mask = null
    this.styleManager = styleManager
    this.arrange = new Arrange([])
    this.clear()
  }

  get bounds (): Readonly<Rect> {
    const points: Point[] = []
    for (const rect of this.shapes.map(p => p.bounds)) points.push(...rect.points)
    return calcBounds(points)
  }

  createShape (style: ShapeStyle | string | null = null, path?: MutablePath2D): Shape {
    const stl = (typeof style === 'string') ? this.styleManager.shapes(style) : style
    if (!path) path = new MutablePath2D()
    const result = new Shape(path, this.arrange.order, stl)
    this.objects.push(result)
    result.frozen = this.frozen
    result.globalTransform = this.globalTransform
    return result
  }

  createTextBlock (text: string, style: TextStyle | string, target?: IPoint): TextBlock {
    const stl = (typeof style === 'string') ? this.styleManager.texts(style) : style
    const result = new TextBlock(text, stl, this.arrange.order)
    if (target) result.target = target
    result.globalTransform = this.globalTransform
    this.objects.push(result)
    return result
  }

  add (entity: Shape2 | Shape | TextBlock | Raster | Sprite | Group): void {
    if (entity instanceof Shape2) {
      this.addShape2(entity)
      return
    }
    if (entity instanceof Shape) {
      this.addShape(entity)
      return
    }
    if (entity instanceof TextBlock) {
      this.addTextBlock(entity)
      return
    }
    if (entity instanceof Raster) {
      this.addRaster(entity)
      return
    }
    if (entity instanceof Sprite) {
      this.addSprite(entity)
      return
    }
    if (entity instanceof Group) {
      this.addGroup(entity)
      return
    }
    throw new Error('The entity has an unknown type')
  }

  addShape (shape: Shape): void {
    if (!shape.order) shape.order = this.arrange.order
    shape.frozen = this.frozen
    shape.globalTransform = this.globalTransform
    this.objects.push(shape)
  }

  addShape2 (shape: Shape2): void {
    if (!shape.order) shape.order = this.arrange.order
    shape.globalTransform = this.globalTransform
    this.objects.push(shape)
  }

  addTextBlock (textBlock: TextBlock): void {
    if (!textBlock.order) textBlock.order = this.arrange.order
    textBlock.globalTransform = this.globalTransform
    // textBlock.frozen = this.frozen
    this.objects.push(textBlock)
  }

  /** @deprecated */
  createImage (raster: Raster) {
    this.objects.push(raster)
  }

  addRaster (raster: Raster) {
    if (!raster.order) raster.order = this.arrange.order
    this.objects.push(raster)
  }

  addSprite (sprite: Sprite) {
    if (!sprite.order) sprite.order = this.arrange.order
    this.objects.push(sprite)
  }

  addGroup (group: Group) {
    if (!group.order) group.order = this.arrange.order
    this.objects.push(group)
  }

  clear () {
    this.objects = []
    this.arrange = new Arrange(this.objects)
  }

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

  removeShape (shape: Shape): void {
    removeItem(this.objects, p => (p as Shape).id === shape.id)
  }

  removeTextBlock (text: TextBlock): void {
    removeItem(this.objects, p => (p as TextBlock).id === text.id)
  }

  removeSprite (sprite: Sprite): void {
    removeItem(this.objects, p => (p as Sprite).id === sprite.id)
  }

  removeRaster (raster: Raster): void {
    removeItem(this.objects, p => (p as Raster).id === raster.id)
  }

  remove (id: string): void {
    removeItem(this.objects, p => (p as Shape).id === id)
  }

  sendToBack (item: Shape | TextBlock | Raster) {
    this.arrange.sendToBack(item)
  }

  sendToBackward (item: Shape | TextBlock | Raster) {
    this.arrange.sendToBackward(item)
  }

  bringToFront (item: Shape | TextBlock | Raster) {
    this.arrange.bringToFront(item)
  }

  bringToForward (item: Shape | TextBlock | Raster) {
    this.arrange.bringToForward(item)
  }

  get shapes (): Shape[] {
    return this.objects.filter(p => p instanceof Shape) as Shape[]
  }

  get textBlocks (): TextBlock[] {
    return this.objects.filter(p => p instanceof TextBlock) as TextBlock[]
  }

  get rasters (): Raster[] {
    return this.objects.filter(p => p instanceof Raster) as Raster[]
  }

  get sprites (): Sprite[] {
    return this.objects.filter(p => p instanceof Sprite) as Sprite[]
  }

  get groups (): Group[] {
    return this.objects.filter(p => p instanceof Group) as Group[]
  }

  get entities (): Readonly<Orderable[]> {
    return this.objects
  }
}
