export interface Colors{
    backgroundColor: string
    graphColor: string
    lineColor: string
    activeLineColor: string
    gridLineColor: string
    selectLineColor: string
    selectLineFontColor: string
}

const colors: Readonly<Colors> = {
  backgroundColor: '#fefeff',
  graphColor: '#21A58E',
  lineColor: '#3f3f3f',
  activeLineColor: '#3fAf3f',
  gridLineColor: 'rgba(20,27,22, 0.21)',
  selectLineColor: '#a80000',
  selectLineFontColor: '#010099'
}

export default colors
