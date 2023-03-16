import { Size } from './geometry/size'
import { IPoint } from './geometry/point'
import { Matrix2D } from './matrix'
import { Rect } from './geometry/rect'

export interface IViewport {
  viewportMatrix: Matrix2D
  get size (): Readonly<Size>
  get bounds (): Rect
  updateSpaceSize ({ width, height }: Size): void
  dispose (): void
}

export class Viewport {
  #bounds: Rect
  #zoomValue: number
  #container: HTMLDivElement
  #space: HTMLDivElement
  #resizeObserver: ResizeObserver
  #scrollChangedEventListener: (ev: Event) => void
  #scrollChangedCallback: () => void
  #viewportResizedCallback: () => void
  onResized: ((size: Size) => void) | null = null
  onScrollChanged: ((point: IPoint) => void) | null = null
  /** @internal */ protected viewportMatrix: Matrix2D = Matrix2D.identity

  constructor (size: Size, container: HTMLDivElement, space: HTMLDivElement, resizedCallback: () => void, scrollChangedCallback: () => void) {
    this.#bounds = new Rect(0, 0, size.width, size.height)
    this.#zoomValue = 1
    this.#container = container
    this.#space = space
    this.#viewportResizedCallback = resizedCallback
    this.#scrollChangedCallback = scrollChangedCallback
    this.#resizeObserver = new ResizeObserver(() => this.resizeViewport())
    this.#resizeObserver.observe(this.#container)
    this.#scrollChangedEventListener = () => this.scrollChanged()
    this.#container.addEventListener('scroll', () => this.scrollChanged())
  }

  scroll (x: number, y: number): void {
    this.#container.scrollBy(x, y)
  }

  zoom (value: number) {
    this.#zoomValue = value
    this.updateViewportMatrix()
  }

  get x (): number {
    return this.#container.scrollLeft
  }

  get y (): number {
    return this.#container.scrollTop
  }

  get size (): Readonly<Size> {
    return this.#bounds
  }

  get spaceSize (): Readonly<Size> {
    return { width: this.#space.clientWidth, height: this.#space.clientHeight }
  }

  /** @internal */ protected updateSpaceSize ({ width, height }: Size): void {
    this.#space.style.width = (width * this.#zoomValue) + 'px'
    this.#space.style.height = (height * this.#zoomValue) + 'px'
  }

  /** @internal */ protected get bounds (): Rect {
    return this.#bounds
  }

  private resizeViewport () {
    const size: Size = { width: this.#container.clientWidth, height: this.#container.clientHeight }
    if (!size.width && !size.height) return
    this.#bounds.width = size.width
    this.#bounds.height = size.height
    this.#viewportResizedCallback()

    if (!this.onResized) return
    this.onResized(this.size)
  }

  private scrollChanged () {
    this.updateViewportMatrix()
    this.#scrollChangedCallback()
    const point = this.getScrollPoint()
    if (this.onScrollChanged) this.onScrollChanged({ x: Math.abs(point.x), y: Math.abs(point.y) })
  }

  private getScrollPoint (): IPoint {
    return { x: -Math.round(this.#container.scrollLeft), y: -Math.round(this.#container.scrollTop) }
  }

  private updateViewportMatrix () {
    const translatePoint = this.getScrollPoint()
    const scalePoint: IPoint = { x: this.#zoomValue, y: this.#zoomValue }
    this.viewportMatrix = Matrix2D.identity.translate(translatePoint).scale(scalePoint)
  }

  /** @internal */ protected dispose (): void {
    this.#resizeObserver.unobserve(this.#container)
    this.#resizeObserver.disconnect()
    this.#container.removeEventListener('scroll', this.#scrollChangedEventListener)
  }
}
