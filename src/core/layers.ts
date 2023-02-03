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
import { Sketch } from './sketch'
import { Group } from './group'
import { uid } from 'utils/uid'
import { Drawable } from './drawable'
import { sort } from '../utils/sorter'
export class Layer implements Orderable {
  #drawables: Drawable[] = []
  private arrange: Arrange
  readonly styleManager: StyleManager
  readonly id: string
  mask: Shape | null
  order: number
  name: string
  frozen: boolean = false
  globalTransform: Matrix2D | null = null
  canvasOrder: 'foreground' | 'background' = 'foreground'

  constructor (order: number, styleManager: StyleManager, name?: string) {
    this.id = uid()
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
    this.#drawables.push(result)
    result.frozen = this.frozen
    result.globalTransform = this.globalTransform
    return result
  }

  createTextBlock (text: string, style: TextStyle | string, target?: IPoint): TextBlock {
    const stl = (typeof style === 'string') ? this.styleManager.texts(style) : style
    const result = new TextBlock(text, stl, this.arrange.order)
    if (target) result.target = target
    result.globalTransform = this.globalTransform
    this.#drawables.push(result)
    return result
  }

  add (drawable: Sketch | Shape | TextBlock | Raster | Sprite | Group): void {
    if (drawable instanceof Sketch) {
      this.addSketch(drawable)
      return
    }
    if (drawable instanceof Shape) {
      this.addShape(drawable)
      return
    }
    if (drawable instanceof TextBlock) {
      this.addTextBlock(drawable)
      return
    }
    if (drawable instanceof Raster) {
      this.addRaster(drawable)
      return
    }
    if (drawable instanceof Sprite) {
      this.addSprite(drawable)
      return
    }
    if (drawable instanceof Group) {
      this.addGroup(drawable)
      return
    }
    throw new Error('The entity has an unknown type')
  }

  addShape (shape: Shape): void {
    if (!shape.order) shape.order = this.arrange.order
    shape.frozen = this.frozen
    shape.globalTransform = this.globalTransform
    this.#drawables.push(shape)
  }

  addSketch (shape: Sketch): void {
    if (!shape.order) shape.order = this.arrange.order
    shape.globalTransform = this.globalTransform
    this.#drawables.push(shape)
  }

  addTextBlock (textBlock: TextBlock): void {
    if (!textBlock.order) textBlock.order = this.arrange.order
    textBlock.globalTransform = this.globalTransform
    // textBlock.frozen = this.frozen
    this.#drawables.push(textBlock)
  }

  addRaster (raster: Raster) {
    if (!raster.order) raster.order = this.arrange.order
    this.#drawables.push(raster)
  }

  addSprite (sprite: Sprite) {
    if (!sprite.order) sprite.order = this.arrange.order
    this.#drawables.push(sprite)
  }

  addGroup (group: Group) {
    if (!group.order) group.order = this.arrange.order
    this.#drawables.push(group)
  }

  clear () {
    this.#drawables = []
    this.arrange = new Arrange(this.#drawables)
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

  remove (drawable: Drawable): void {
    this.removeById(drawable.id)
  }

  removeById (id: string): void {
    removeItem(this.#drawables, p => p.id === id)
  }

  removeByName (name: string): void {
    removeItem(this.#drawables, p => p.name === name)
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
    return this.#drawables.filter(p => p instanceof Shape) as Shape[]
  }

  get sketches (): Sketch[] {
    return this.#drawables.filter(p => p instanceof Sketch) as Sketch[]
  }

  get textBlocks (): TextBlock[] {
    return this.#drawables.filter(p => p instanceof TextBlock) as TextBlock[]
  }

  get rasters (): Raster[] {
    return this.#drawables.filter(p => p instanceof Raster) as Raster[]
  }

  get sprites (): Sprite[] {
    return this.#drawables.filter(p => p instanceof Sprite) as Sprite[]
  }

  get groups (): Group[] {
    return this.#drawables.filter(p => p instanceof Group) as Group[]
  }

  get drawables (): Readonly<Drawable[]> {
    return sort(this.#drawables)
  }

  get modified (): boolean {
    return this.#drawables.some(p => p.modified)
  }
}
