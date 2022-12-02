import { Demo } from './demo'

export const createDemo = (app: HTMLDivElement) => (new Demo(app)).build()
