interface Colors{
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
  graphColor: '#1f4f8f',
  lineColor: '#3f3f3f',
  activeLineColor: '#3fAf3f',
  gridLineColor: 'rgba(220,227,222, 0.11)',
  selectLineColor: '#a80000',
  selectLineFontColor: '#010099'
}

export default colors
