const speed = {
  pps (pps: number, fps = 60) {
    return pps / fps
  },
  s (s: number, fps = 60) {
    return 1 / fps * s
  }
}

export { speed }

export class Speed {
  value: number

  constructor (value: number) {
    this.value = value
  }

  pps (pps: number, fps = 60) {
    this.value = speed.pps(pps, fps)
  }

  s (s: number, fps = 60) {
    this.value = speed.s(s, fps)
  }

  static pps (pps: number, fps = 60) {
    return new Speed(speed.pps(pps, fps))
  }

  static s (s: number, fps = 60) {
    return new Speed(speed.s(s, fps))
  }
}

export function createClock (value: number | Speed, callback: () => void) {
  let k = 0
  let l = 0

  return () => {
    const tk = Math.trunc(k)
    if (tk > l) {
      l = tk
      callback()
    }
    k += value instanceof Speed ? value.value : value
  }
}
