import { DrawableDTO } from './drawable'

export interface GroupDTO {
  type: 'group'
  id: string
  name: string
  items: DrawableDTO[]
}
