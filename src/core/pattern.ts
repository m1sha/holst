import { Raster } from './raster'

export type Repetition = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'

export class Pattern {
  raster: Raster
  repetition: Repetition

  constructor (raster: Raster, repetition: Repetition = 'repeat') {
    this.raster = raster
    this.repetition = repetition
  }
}
