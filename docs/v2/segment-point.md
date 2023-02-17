```ts
interface ISegmentPoint implements IPoint {
    x: number
    y: number
    cp1x?: number
    cp1y?: number
    cp2x?: number
    cp2y?: number
}
```

```ts
interface SegmentPoint extends Point implements ISegmentPoint {
    x: number
    y: number
    cp1x?: number
    cp1y?: number
    cp2x?: number
    cp2y?: number
}
```