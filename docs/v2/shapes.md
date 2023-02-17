```ts
class Circle {
    constructor (radial: Radial, segmentCount: number = 0, segmentType: string = 'line')
    constructor (x: number, y: number, radius: number, segmentCount: number = 0, segmentType: string = 'line')
    x: number
    y: number
    radius: number
    segmentCount: number
    segmentType: 'line' | 'bezier'
    changeSegment (index: number, callback: (point: ISegmentPoint) => void)
    foreachSegment (callback: (point: ISegmentPoint, index: number) => void)
}
```