import { Color, HSV, Point } from '../../src/index'

export function createColorsDemo (canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  for (let i = 0; i < 360; i++) {
    for (let j = 0; j < 100; j++) {
    //   ctx.fillStyle = new Color(new HSV(i, 100, 100)).toString()
    //   ctx.fillRect(i * 2, j * 2, 2, 2)
    // }
      const p = rotate(new Point(100 - j, 100 - j), new Point(200 + j, 200 + j), i)
      ctx.save()
      ctx.fillStyle = new Color(new HSV(i, 100, 100)).toString()
      ctx.strokeStyle = new Color(new HSV(i, 100, 100)).toString()
      // ctx.ellipse(i * 2 + 5, 70, 2, 2, 0, Math.PI, Math.PI * 2)
      // ctx.stroke()
      // ctx.fillRect(i * 2 + 5, 70, 2, 2)
      const path = new Path2D()
      path.ellipse(p.x, p.y, 1, 1, 0, Math.PI, Math.PI * 2)
      ctx.fill(path)
      ctx.restore()
    }
  }

  // ctx.fillStyle = new Color(new HSV(10, 100, 100)).toString()
  // ctx.strokeStyle = '#333' // new Color(new HSV(60, 100, 100)).toString()
  // ctx.ellipse(100, 100, 50, 10, Math.PI, 0, Math.PI * 2)
  // ctx.fillRect(100, 100, 50, 100)
  // ctx.stroke()
  // ctx.fill()
}

const rotate = (point: Point, target: Point, angle: number): Point => {
  const result = new Point(point)
  const rad = gradToRad(angle)
  const sin = Math.sin(rad)
  const cos = Math.cos(rad)
  result.x -= target.x
  result.y -= target.y
  const px = result.x * cos - result.y * sin + target.x
  const py = result.x * sin + result.y * cos + target.y
  result.x = px
  result.y = py
  return result
}

const gradToRad = (angle: number): number => {
  return angle * Math.PI / 180
}
