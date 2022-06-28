
/* global CanvasRenderingContext2DSettings, GlobalCompositeOperation, CanvasImageSource, CanvasFillRule, ImageDataSettings, ImageSmoothingQuality, CanvasLineCap, CanvasLineJoin, CanvasDirection, CanvasTextAlign, CanvasTextBaseline, DOMMatrix2DInit */
import { Size } from '../../src/core/size'
import { ICanvasRenderingContext2D } from '../../src/core/render/canvas-rendering-context-2d'
import { GlobalAnimationFrameHandlerFactory } from '../../src/core/animation-handler'

class Logger {
  messages: unknown[] = []
  add (message: unknown) {
    this.messages.push(message)
  }
}

class MockCanvasRenderingContext2D implements ICanvasRenderingContext2D {
  logger: Logger
  constructor (logger: Logger) {
    this.logger = logger
  }

  canvas: Size = { width: 400, height: 400 }
  getContextAttributes (): CanvasRenderingContext2DSettings {
    return {
      alpha: true,
      colorSpace: 'srgb',
      desynchronized: false,
      willReadFrequently: false
    }
  }

  globalAlpha: number = 0
  globalCompositeOperation: GlobalCompositeOperation = 'color'

  drawImage (image: CanvasImageSource, dx: number, dy: number): void
  // eslint-disable-next-line no-dupe-class-members
  drawImage (image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void
  // eslint-disable-next-line no-dupe-class-members
  drawImage (image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
  // eslint-disable-next-line no-dupe-class-members
  drawImage (image: unknown, sx: unknown, sy: unknown, sw?: unknown, sh?: unknown, dx?: unknown, dy?: unknown, dw?: unknown, dh?: unknown): void {
    this.logger.add('drawImage')
  }

  beginPath (): void {
    this.logger.add('beginPath')
  }

  clip (fillRule?: CanvasFillRule | undefined): void
  // eslint-disable-next-line no-dupe-class-members
  clip (path: Path2D, fillRule?: CanvasFillRule | undefined): void
  // eslint-disable-next-line no-dupe-class-members
  clip (path?: unknown, fillRule?: unknown): void {
    this.logger.add('clip')
  }

  fill (fillRule?: CanvasFillRule | undefined): void
  // eslint-disable-next-line no-dupe-class-members
  fill (path: Path2D, fillRule?: CanvasFillRule | undefined): void
  // eslint-disable-next-line no-dupe-class-members
  fill (path?: unknown, fillRule?: unknown): void {
    this.logger.add('fill')
  }

  isPointInPath (x: number, y: number, fillRule?: CanvasFillRule | undefined): boolean;
  // eslint-disable-next-line no-dupe-class-members
  isPointInPath (path: Path2D, x: number, y: number, fillRule?: CanvasFillRule | undefined): boolean;
  // eslint-disable-next-line no-dupe-class-members
  isPointInPath (path: unknown, x: unknown, y?: unknown, fillRule?: unknown): boolean {
    this.logger.add('isPointInPath')
    return false
  }

  isPointInStroke (x: number, y: number): boolean
  // eslint-disable-next-line no-dupe-class-members
  isPointInStroke (path: Path2D, x: number, y: number): boolean
  // eslint-disable-next-line no-dupe-class-members
  isPointInStroke (path: unknown, x: unknown, y?: unknown): boolean {
    this.logger.add('isPointInStroke')
    return false
  }

  stroke (): void
  // eslint-disable-next-line no-dupe-class-members
  stroke (path: Path2D): void
  // eslint-disable-next-line no-dupe-class-members
  stroke (path?: unknown): void {
    this.logger.add('stroke')
  }

  fillStyle: string | CanvasGradient | CanvasPattern = '#fff'

  strokeStyle: string | CanvasGradient | CanvasPattern = '#000'

  createConicGradient (startAngle: number, x: number, y: number): CanvasGradient {
    this.logger.add('createConicGradient')
    return new CanvasGradient()
  }

  createLinearGradient (x0: number, y0: number, x1: number, y1: number): CanvasGradient {
    this.logger.add('createConicGradient')
    return new CanvasGradient()
  }

  createPattern (image: CanvasImageSource, repetition: string | null): CanvasPattern | null {
    this.logger.add('createPattern')
    throw new Error('Method not implemented.')
  }

  createRadialGradient (x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient {
    this.logger.add('createRadialGradient')
    throw new Error('Method not implemented.')
  }

  filter: string = ''

  createImageData (sw: number, sh: number, settings?: ImageDataSettings | undefined): ImageData
  // eslint-disable-next-line no-dupe-class-members
  createImageData (imagedata: ImageData): ImageData
  // eslint-disable-next-line no-dupe-class-members
  createImageData (sw: unknown, sh?: unknown, settings?: unknown): ImageData {
    throw new Error('Method not implemented.')
  }

  getImageData (sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings | undefined): ImageData {
    throw new Error('Method not implemented.')
  }

  putImageData (imagedata: ImageData, dx: number, dy: number): void
  // eslint-disable-next-line no-dupe-class-members
  putImageData (imagedata: ImageData, dx: number, dy: number, dirtyX: number, dirtyY: number, dirtyWidth: number, dirtyHeight: number): void
  // eslint-disable-next-line no-dupe-class-members
  putImageData (imagedata: unknown, dx: unknown, dy: unknown, dirtyX?: unknown, dirtyY?: unknown, dirtyWidth?: unknown, dirtyHeight?: unknown): void {
    throw new Error('Method not implemented.')
  }

  imageSmoothingEnabled: boolean = true
  imageSmoothingQuality: ImageSmoothingQuality = 'high'

  arc (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void {
    this.logger.add('arc')
  }

  arcTo (x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.logger.add('arcTo')
  }

  bezierCurveTo (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    this.logger.add('bezierCurveTo')
  }

  closePath (): void {
    this.logger.add('bezierCurveTo')
  }

  ellipse (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void {
    this.logger.add('bezierCurveTo')
  }

  lineTo (x: number, y: number): void {
    this.logger.add('bezierCurveTo')
  }

  moveTo (x: number, y: number): void {
    this.logger.add('bezierCurveTo')
  }

  quadraticCurveTo (cpx: number, cpy: number, x: number, y: number): void {
    this.logger.add('bezierCurveTo')
  }

  rect (x: number, y: number, w: number, h: number): void {
    this.logger.add('bezierCurveTo')
  }

  lineCap: CanvasLineCap = 'butt'
  lineDashOffset: number = 0
  lineJoin: CanvasLineJoin = 'bevel'
  lineWidth: number = 1
  miterLimit: number = 1

  getLineDash (): number[] {
    throw new Error('Method not implemented.')
  }

  setLineDash(segments: number[]): void;
  // eslint-disable-next-line no-dupe-class-members
  setLineDash(segments: Iterable<number>): void;
  // eslint-disable-next-line no-dupe-class-members
  setLineDash (segments: unknown): void {
    throw new Error('Method not implemented.')
  }

  clearRect (x: number, y: number, w: number, h: number): void {
    this.logger.add('bezierCurveTo')
  }

  fillRect (x: number, y: number, w: number, h: number): void {
    this.logger.add('bezierCurveTo')
  }

  strokeRect (x: number, y: number, w: number, h: number): void {
    this.logger.add('bezierCurveTo')
  }

  shadowBlur: number = 0
  shadowColor: string = '#000'
  shadowOffsetX: number = 0
  shadowOffsetY: number = 0

  restore (): void {
    this.logger.add('bezierCurveTo')
  }

  save (): void {
    this.logger.add('bezierCurveTo')
  }

  fillText (text: string, x: number, y: number, maxWidth?: number | undefined): void {
    throw new Error('Method not implemented.')
  }

  measureText (text: string): TextMetrics {
    throw new Error('Method not implemented.')
  }

  strokeText (text: string, x: number, y: number, maxWidth?: number | undefined): void {
    throw new Error('Method not implemented.')
  }

  direction: CanvasDirection = 'inherit'
  font: string = 'serif'
  textAlign: CanvasTextAlign = 'start'
  textBaseline: CanvasTextBaseline = 'alphabetic'

  getTransform (): DOMMatrix {
    throw new Error('Method not implemented.')
  }

  resetTransform (): void {
    throw new Error('Method not implemented.')
  }

  rotate (angle: number): void {
    throw new Error('Method not implemented.')
  }

  scale (x: number, y: number): void {
    throw new Error('Method not implemented.')
  }

  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  // eslint-disable-next-line no-dupe-class-members
  setTransform(transform?: DOMMatrix2DInit | undefined): void;
  // eslint-disable-next-line no-dupe-class-members
  setTransform (a?: unknown, b?: unknown, c?: unknown, d?: unknown, e?: unknown, f?: unknown): void {
    throw new Error('Method not implemented.')
  }

  transform (a: number, b: number, c: number, d: number, e: number, f: number): void {
    throw new Error('Method not implemented.')
  }

  translate (x: number, y: number): void {
    throw new Error('Method not implemented.')
  }

  drawFocusIfNeeded(element: Element): void;
  // eslint-disable-next-line no-dupe-class-members
  drawFocusIfNeeded(path: Path2D, element: Element): void;
  // eslint-disable-next-line no-dupe-class-members
  drawFocusIfNeeded (path: unknown, element?: unknown): void {
    throw new Error('Method not implemented.')
  }
}

GlobalAnimationFrameHandlerFactory.requestAnimationFrame = () => 0

export function createMockContext () {
  const logger = new Logger()
  return {
    logger,
    ctx: new MockCanvasRenderingContext2D(logger) as unknown as CanvasRenderingContext2D
  }
}
