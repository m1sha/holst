import { Size } from '../geometry/size'

export default class CanvasRenderingContext2DFactory {
  private static canvas: HTMLCanvasElement | null = null
  private static ctx: CanvasRenderingContext2D | null = null
  static get default () {
    const { ctx, canvas } = this
    if (canvas && ctx) return { ctx, canvas }
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    if (!this.ctx) throw new Error('CanvasRenderingContext2D is unsupported')
    return { ctx: this.ctx, canvas: this.canvas }
  }

  static create (size: Size) {
    const canvas = document.createElement('canvas')
    canvas.width = size.width || 300
    canvas.height = size.height || 300
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('CanvasRenderingContext2D is unsupported')
    return { ctx: ctx, canvas: canvas }
  }
}
