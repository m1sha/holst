import { ChartBase } from './chart-base'
import { Colors } from './colors'
import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { Size } from '../core/size'

export interface Legend {
    chartName?: string
    xTitle?: string
    yTitle?: string
}

export interface Threshold {
  value: number,
  color: string
}

export interface ChartStyle {
  colors?: Colors,
  axisValueFontSize?: number,
  axisTitleFontSize?: number,
  chartTitleFontSize?: number,
  padding?: Padding,
  graphLineWidth?: number
}

export interface TooltipStyle {
  padding?: Padding,
  lineHeight?: number,
  size?: Size
}

export interface ChartOptions {
  legend?: Legend,
  thresholds?: Threshold[],
  thresholdOrientation: 'x' | 'y',
  chartStyle?: ChartStyle,
  xFieldName: string,
  yFieldName: string,
  xFieldDisplayFormat?: (value: unknown) => unknown,
  yFieldDisplayFormat?: (value: unknown) => unknown,
  xSegmentCount: number,
  ySegmentCount: number,
  width: number,
  height: number,
  tooltipStyle?: TooltipStyle,
  onDraw?: (chart: ChartBase) => boolean,
  onMove?: (chart: ChartBase, point: Point) => boolean
  onCalculateBoundary?: (data: [], options: ChartOptions) => { maxWidth: number, maxHeight: number, minWidth: number, minHeight: number }
}
