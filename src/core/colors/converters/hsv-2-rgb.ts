export function hsv2rgb (h: number, s: number, v: number): [number, number, number, number] {
  let H = h / 360
  const S = s / 100
  let V = v / 100
  let R = 0
  let G = 0
  let B = 0
  let A = 0
  let C, D
  if (S === 0) {
    R = G = B = Math.round(V * 255)
  } else {
    if (H >= 1) H = 0
    H = 6 * H
    D = H - Math.floor(H)
    A = Math.round(255 * V * (1 - S))
    B = Math.round(255 * V * (1 - (S * D)))
    C = Math.round(255 * V * (1 - (S * (1 - D))))
    V = Math.round(255 * V)
    switch (Math.floor(H)) {
      case 0:
        R = V
        G = C
        B = A
        break
      case 1:
        R = B
        G = V
        B = A
        break
      case 2:
        R = A
        G = V
        B = C
        break
      case 3:
        R = A
        G = B
        B = V
        break
      case 4:
        R = C
        G = A
        B = V
        break
      case 5:
        R = V
        G = A
        // B = B
        break
    }
  }
  return [R || 0, G || 0, B || 0, 1]
}
