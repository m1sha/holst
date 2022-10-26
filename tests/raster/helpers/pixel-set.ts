export class PixelSet {
  private image: string

  constructor (image: string) {
    this.image = image
  }

  toArray (): number[] {
    const result: number[] = []
    const hex = '0123456789ABCDEFabcdef'
    let buffer = ''
    for (let i = 0; i < this.image.length; i++) {
      const chr = this.image.charAt(i)
      if (hex.indexOf(chr) > -1) {
        buffer += chr
        if (i === this.image.length - 1) {
          if (buffer.length === 0) continue
          result.push(...this.parse(buffer))
          buffer = ''
        }
        continue
      }
      if (buffer.length === 0) continue
      result.push(...this.parse(buffer))
      buffer = ''
    }

    return result
  }

  toU8Array (): Uint8ClampedArray {
    return Uint8ClampedArray.from(this.toArray())
  }

  private parse (buffer: string): number[] {
    if (buffer.length > 0 && buffer.length < 6) throw new Error('hex has unsupported format')
    return [
      parseInt(buffer.substring(0, 2), 16),
      parseInt(buffer.substring(2, 4), 16),
      parseInt(buffer.substring(4, 6), 16),
      255
    ]
  }
}
