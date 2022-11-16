export function rgb2str (r: number, g: number, b: number, a?: number): string {
  let rs = r.toString(16)
  rs = rs.length === 1 ? '0' + rs : rs
  let gs = g.toString(16)
  gs = gs.length === 1 ? '0' + gs : gs
  let bs = b.toString(16)
  bs = bs.length === 1 ? '0' + bs : bs
  return a === 1 ? `#${rs}${gs}${bs}` : `rgba(${r},${g},${b},${a})`
}
