import { ChartBase, Legend } from './chart-base'
import { Colors } from './colors'
import { Padding } from '../core/padding'
import { Point } from '../core/point'

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

export interface ChartOptions {
    legend?: Legend,
    thresholds?: Threshold[],
    thresholdOrientation: 'x' | 'y',
    chartStyle?: ChartStyle,
    xFieldName: string,
    yFieldName: string,
    xFieldDisplayFormat?: (value: unknown) => unknown,
    yFieldDisplayFormat?: (value: unknown) => unknown,
    width: number,
    height: number,
    onDraw?: (chart: ChartBase) => boolean,
    onMove?: (chart: ChartBase, point: Point) => boolean
    onCalculateBoundary?: (data: [], options: ChartOptions) => { width: number, height: number }
}
