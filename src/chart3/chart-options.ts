import { ChartBase } from './chart-base'
import { Colors } from './colors'
import { Padding } from '../core/padding'
import { Point } from '../core/point'
import { Size } from '../core/size'

export interface Tooltip {
  onShow?: (e: unknown, i: unknown) => void
  onHide?: () => void
}

export interface Legend {
    chartName?: string
    xTitle?: string
    yTitle?: string
    tooltip?: Tooltip
}

export interface Threshold {
  maxValue: number,
  minValue: number,
  color: string,
  showLimits: boolean
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
  yMaxThresholdValue?: (value: unknown) => string,
  yMinThresholdValue?: (value: unknown) => string,
  chartStyle?: ChartStyle,
  xFieldName: string,
  yFieldName: string,
  xFieldDisplayFormat?: (value: unknown) => unknown,
  yFieldDisplayFormat?: (value: unknown) => unknown,
  xFieldToolTipFormat?: (value: unknown) => unknown,
  yFieldToolTipFormat?: (value: unknown) => unknown,
  yAxisValueFormat?: (value: unknown) => string,
  xSegmentCount: number,
  ySegmentCount: number,
  width: number,
  height: number,
  tooltipStyle?: TooltipStyle,
  onDraw?: (chart: ChartBase) => boolean,
  onMove?: (chart: ChartBase, point: Point) => boolean
  onMoveRaw?: (chart: ChartBase, point: Point) => boolean
  onCalculateBoundary?: (data: [], options: ChartOptions) => { maxWidth: number, maxHeight: number, minWidth: number, minHeight: number },
  maxY?: number,
  minY?: number
}
