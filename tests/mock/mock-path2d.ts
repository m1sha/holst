import { GlobalPath2DFactory } from '../../src/core/path2d/mutable-path2d'
import { DOMPointCorners, Path2DBase } from '../../src/core/path2d/path2d-base'

export class MockPath2D implements Path2DBase {
  addPath (path: Path2D, transform?: unknown): void {
    //
  }

  arc (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void {
    //
  }

  arcTo (x1: number, y1: number, x2: number, y2: number, radius: number): void {
    //
  }

  bezierCurveTo (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    //
  }

  ellipse (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined): void {
    //
  }

  lineTo (x: number, y: number): void {
    //
  }

  moveTo (x: number, y: number): void {
    //
  }

  quadraticCurveTo (cpx: number, cpy: number, x: number, y: number): void {
    //
  }

  rect (x: number, y: number, w: number, h: number): void {
    //
  }

  roundRect (x: number, y: number, w: number, h: number, radii?: number | DOMPointCorners | (number | DOMPointCorners)[]): void {
    //
  }

  closePath (): void {
    //
  }
}

GlobalPath2DFactory.create = () => {
  return new MockPath2D()
}
