import { Scene, Renderer2D, Shape, Rect } from 'index'

export function createMovementDemo (canvas: HTMLCanvasElement) {
  const scene = new Scene()
  const layer0 = scene.createLayer()
  const shp0 = layer0.createShape({ strokeStyle: '#333', fillStyle: '#84a2cb' })
  shp0.rect(new Rect(10, 10, 100, 100))

  const shp1 = layer0.createShape({ strokeStyle: '#513131', fillStyle: '#8881d8' })
  shp1.rect(new Rect(10, 120, 100, 100))

  const shp2 = layer0.createShape({ strokeStyle: '#513131', fillStyle: '#708a41' })
  shp2.roundRect(new Rect(10, 230, 100, 100), 16)

  const shp3 = layer0.createShape({ fillStyle: '#86414c' })
  shp3.arc({ x: 10 + 50, y: 340 + 50 }, 50, 0, Math.PI * 2)

  const shp4 = layer0.createShape({ fillStyle: '#d1c8b7' })
  shp4.ellipse({ x: 10 + 50, y: 450 + 50 }, 55, 24, 0, 0, Math.PI * 2)

  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)

  movement([shp0, shp1, shp2, shp3, shp4])
}

function movement (shapes: Shape[]) {
  let x = 0
  let sign = 1
  let vSign = 1
  let a = 0
  let v = 0
  setInterval(() => {
    if (x > 680) {
      sign = -1
      a = 0
    }
    if (x < 10) {
      sign = 1
      a = 0
    }
    a += 0.1
    x += (5 + a) * sign

    if (v > 10) vSign = -1
    if (v < -20) vSign = 1
    v += 1 * vSign
    shapes.forEach(p => {
      p.move({ x, y: v })
    })
  }, 20)
}
