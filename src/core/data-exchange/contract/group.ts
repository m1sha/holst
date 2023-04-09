import { DrawableDTO } from './drawable'

export interface GroupDTO {
  type: 'group',
  name: string
  items: DrawableDTO[]
}
