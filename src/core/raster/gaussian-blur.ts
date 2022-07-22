/* Sources: https://www.peterkovesi.com/papers/FastGaussianSmoothing.pdf, https://gist.github.com/bfraboni/946d9456b15cac3170514307cf032a27 */

function stdToBox (boxes: number[], sigma: number, n: number) {
  // ideal filter width
  const wi = Math.sqrt((12 * sigma * sigma / n) + 1)
  let wl = Math.floor(wi)
  if (wl % 2 === 0) wl--
  const wu = wl + 2

  const mi = (12 * sigma * sigma - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4)
  const m = Math.round(mi)

  for (let i = 0; i < n; i++) { boxes[i] = ((i < m ? wl : wu) - 1) / 2 }
}

function horizontalBlur (src: number[], out: number[], w: number, h: number, r: number) {
  const iArr = 1.0 / (r + r + 1)

  for (let i = 0; i < h; i++) {
    let ti = i * w; let li = ti; let ri = ti + r; const fv = src[ti]; const lv = src[ti + w - 1]; let val = (r + 1) * fv
    for (let j = 0; j < r; j++) { val += src[ti + j] }
    for (let j = 0; j <= r; j++) { val += src[ri++] - fv; out[ti++] = Math.round(val * iArr) }
    for (let j = r + 1; j < w - r; j++) { val += src[ri++] - src[li++]; out[ti++] = Math.round(val * iArr) }
    for (let j = w - r; j < w; j++) { val += lv - src[li++]; out[ti++] = Math.round(val * iArr) }
  }
}

function totalBlur (src: number[], out: number[], w: number, h: number, r: number) {
  const iArr = 1.0 / (r + r + 1)

  for (let i = 0; i < w; i++) {
    let ti = i; let li = ti; let ri = ti + r * w; const fv = src[ti]; const lv = src[ti + w * (h - 1)]; let val = (r + 1) * fv
    for (let j = 0; j < r; j++) { val += src[ti + j * w] }
    for (let j = 0; j <= r; j++) { val += src[ri] - fv; out[ti] = Math.round(val * iArr); ri += w; ti += w }
    for (let j = r + 1; j < h - r; j++) { val += src[ri] - src[li]; out[ti] = Math.round(val * iArr); li += w; ri += w; ti += w }
    for (let j = h - r; j < h; j++) { val += lv - src[li]; out[ti] = Math.round(val * iArr); li += w; ti += w }
  }
}

function boxBlur (src: number[], out: number[], w: number, h: number, r: number) {
  // std::swap(src, out);
  for (let i = 0; i < src.length; i++) out[i] = src[i]
  horizontalBlur(out, src, w, h, r)
  totalBlur(src, out, w, h, r)
}

export function gaussianBlur (arr: Uint8ClampedArray, w: number, h: number, sigma: number) {
  const out = new Array(arr.length).fill(0)
  const src = new Array(arr.length).fill(0)
  for (let i = 0; i < arr.length; i++) src[i] = arr[i]
  const boxes = [0, 0, 0]
  stdToBox(boxes, sigma, 3)
  boxBlur(src, out, w, h, boxes[0])
  boxBlur(out, src, w, h, boxes[1])
  boxBlur(src, out, w, h, boxes[2])
  for (let i = 0; i < arr.length; i++) arr[i] = out[i]
}
