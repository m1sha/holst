import { Drawable } from '../../../../src'
import { Entity } from './entity'

export type EntityReadonly<T extends Drawable> = Readonly<Entity<T>>
