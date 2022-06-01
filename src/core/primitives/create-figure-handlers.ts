import { IPoint } from '../point'
import { Figure, QuadraticCurveTo } from './types/figures'

type CreateFigureHandlerDelegateData = {
  index: number
  cp: IPoint
  p: IPoint
}
type CreateFigureHandlerDelegate = (result: Figure, data: CreateFigureHandlerDelegateData) => void

const handlers: Record <string, CreateFigureHandlerDelegate> = {}

handlers.QuadraticCurveTo = (result, { index, cp, p }) => {
  const item: QuadraticCurveTo = { cp, p, index, type: 'QuadraticCurveTo' }
  result.map[index] = item
  result.quadraticCurveTo.push(item)
}

export default handlers
