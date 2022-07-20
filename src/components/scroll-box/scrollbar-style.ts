export interface TrackStyle {
  width: number
  color: string
  border: string
}

export interface TrackButtonStyle {
  width: number
  color: string
  border: string
  hover: string
}

export interface ThumbButtonStyle {
  color: string
  border: string
  hover: string
}

export interface ScrollBarStyle {
  track: TrackStyle
  trackButton: TrackButtonStyle
  thumbButton: ThumbButtonStyle
}

export function defaultScrollBarStyle (): ScrollBarStyle {
  return {
    track: {
      width: 20,
      color: '#f4f4f4',
      border: '#e0e0e0'
    },
    trackButton: {
      width: 20,
      color: '#e6e6e6',
      border: '#c0c0c0',
      hover: '#363636'
    },
    thumbButton: {
      color: '#c9c9c9',
      border: '#3f3f3f',
      hover: '#3f3f3f'
    }
  }
}
