import { Demo } from './demo'

export const createDemo = (app: HTMLDivElement) => (new Demo()).create(app)
