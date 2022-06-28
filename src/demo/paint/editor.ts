
import { Size } from '../../core/size'
import { Scene, Renderer2D, Color, ConstraintGrid, EventHandler, Layer } from 'index'
import { Runtime } from './runtime'

export class Editor {
  private scene: Scene
  private renderer: Renderer2D
  size: Size
  eventHandler: EventHandler
  private runtime: Runtime
  mapSizeX: number = 16
  mapSizeY: number = 16
  private map: number[] = []
  layer0: Layer

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene()
    this.layer0 = this.scene.createLayer()
    if (canvas) { canvas.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation() }) }
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('')
    this.size = { width: canvas.width, height: canvas.height }
    this.renderer = new Renderer2D(ctx)
    this.eventHandler = new EventHandler(this.scene, this.renderer)
    this.eventHandler.onRendering = () => this.createView()
    this.runtime = new Runtime(this)

    for (let i = 0; i < this.mapSizeX * this.mapSizeY; i++) this.map.push(0)
    this.createView()
    this.renderer.render(this.scene)
  }

  setMap (row: number, col: number) {
    // alert(`row: ${row} col: ${col}`)
    console.time()
    const index = (row * this.mapSizeX) + col
    this.map[index] = this.map[index] === 0 ? 1 : 0
    console.timeEnd()
  }

  private createView () {
    this.layer0.clear()
    const grid = new ConstraintGrid(this.size, this.mapSizeY, this.mapSizeX)
    const neutral = this.layer0.createShape({ fill: new Color('hsv(0, 0, 90)'), lineWidth: 8, stroke: new Color('hsv(0, 0, 50)') })
    const black = this.layer0.createShape({ fill: new Color('hsv(0, 0, 0)'), stroke: new Color('hsv(0, 0, 50)') })
    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.columns; j++) {
        const cell = grid.getCell(i, j)
        const v = this.getMap(i, j)
        if (v) black.rect(cell.rect)
        else {
          // neutral.rect(cell.rect)
          neutral.arc(cell.center, 4, 0, Math.PI * 2, true)
        }
      }
    }
  }

  getMap (row: number, columns: number) {
    const index = (row * this.mapSizeX) + columns
    return this.map[index]
  }
}
