export function rgb2int (r: number, g: number, b: number): number {
  let rgb = r
  rgb = (rgb << 8) + g
  rgb = (rgb << 8) + b
  return rgb
}
