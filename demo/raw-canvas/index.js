function main () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const path0 = new Path2D()
  const r = 30

  path0.moveTo(50 + r, 50)
  // path0.ellipse(50, 50, r, r, 0, 0, Math.PI * 2, false)
  // path0.closePath()
  path0.arc(50, 50, r, 0, Math.PI * 2, true)
  path0.closePath()

  path0.moveTo(125 + r, 50)
  // path0.ellipse(150, 50, r, r, 0, 0, Math.PI * 2, true)
  path0.arc(125, 50, r, 0, Math.PI * 2, true)
  path0.closePath()

  path0.moveTo(200 + r, 50)
  // path0.ellipse(200, 50, r, r, 0, 0, Math.PI * 2, true)
  path0.arc(200, 50, r, 0, Math.PI * 2, true)
  path0.closePath()

  ctx.fillStyle = '#437353'
  ctx.strokeStyle = '#4d2d1d'
  ctx.lineWidth = 6
  ctx.fill(path0)
  ctx.stroke(path0)
}

main()
