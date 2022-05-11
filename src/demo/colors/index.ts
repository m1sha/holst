export function createColorsDemo (canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.fillStyle = '#333'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
