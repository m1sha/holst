```ts
class Sketch {
    get style: ShapeStyle
    rect (): this
    arc (): this
    ellipse (): this
    circle (): this
    line (): Line
    curve (): Curve
    add (shape: Shape): this
    get<T> (index: number): T
    replace (indexFrom: number, indexTo: number)
    setTransform (matrix: Matrix2D)
    get transform (): Matrix2D
    get bounds (): Rect
    clone (): Sketch
    merge (sketch: Sketch, withoutStyle: boolean = true): void
    rasterize (): ImageData
}
``` 