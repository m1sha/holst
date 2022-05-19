export interface ScrollBarStyle {
  trackSize: number
  trackBackgroundColor: string
  trackBorderColor: string
  thumbSize: number
  thumbBackgroundColor: string
  thumbBackgroundColorHover: string
  thumbBorderColor: string
  buttonBackgroundColor: string
  buttonBorderColor: string,
  buttonBackgroundColorHover: string
}

export function defaultScrollBarStyle (): ScrollBarStyle {
  return {
    trackSize: 20,
    trackBackgroundColor: '#f4f4f4',
    trackBorderColor: '#e0e0e0',
    thumbSize: 20,
    thumbBackgroundColor: '#c9c9c9',
    thumbBackgroundColorHover: '#3f3f3f',
    thumbBorderColor: '#f2f1f1',
    buttonBackgroundColor: '#e6e6e6',
    buttonBorderColor: '#c0c0c0',
    buttonBackgroundColorHover: '#363636'
  }
}
